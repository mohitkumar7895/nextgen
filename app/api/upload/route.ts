export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { execute, query } from '@/lib/db';
import fs from 'fs';
import path from 'path';

// Helper to ensure media table and file_data column exist
async function ensureMediaTable() {
  try {
    await execute(`
      CREATE TABLE IF NOT EXISTS \`media\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`file_name\` VARCHAR(255) NOT NULL,
        \`original_name\` VARCHAR(255) NOT NULL,
        \`file_url\` VARCHAR(500) NOT NULL,
        \`file_type\` VARCHAR(50) NOT NULL,
        \`file_size\` INT NOT NULL DEFAULT 0,
        \`media_category\` VARCHAR(50) NOT NULL DEFAULT 'general',
        \`alt_text\` VARCHAR(255) NULL,
        \`file_data\` LONGTEXT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX \`idx_media_category\` (\`media_category\`),
        INDEX \`idx_media_filename\` (\`file_name\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Ensure file_data column exists if table was created earlier without it
    try {
      await execute('ALTER TABLE media ADD COLUMN file_data LONGTEXT NULL AFTER alt_text;');
    } catch {
      // Column already exists, ignore
    }
  } catch (err: any) {
    console.warn('ensureMediaTable warning:', err?.message);
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await ensureMediaTable();
    const media = await query<any>(
      'SELECT id, file_name, original_name, file_url, file_type, file_size, media_category, alt_text, created_at FROM media ORDER BY created_at DESC LIMIT 100;'
    );
    const res = NextResponse.json(media);
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    return res;
  } catch (error: any) {
    console.error('Media GET error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'general';
    const altText = (formData.get('alt_text') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';

    const ext = path.extname(file.name) || (mimeType.includes('png') ? '.png' : mimeType.includes('webp') ? '.webp' : '.jpg');
    const rawBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50) || 'upload';
    const uniqueFileName = `${rawBase}_${Date.now()}${ext}`;

    // 1. Try to write to local filesystem if writeable (e.g. VPS / local development)
    let wroteToDisk = false;
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadsDir, uniqueFileName), buffer);
      wroteToDisk = true;
    } catch {
      // Read-only filesystem on Vercel / serverless runtime is normal and expected
      wroteToDisk = false;
    }

    // Standard public URL served by our dynamic route
    const fileUrl = `/api/upload/${uniqueFileName}`;

    // 2. Persist to database so Vercel can serve the image dynamically
    let dbSuccess = false;
    try {
      await ensureMediaTable();
      await execute(
        `INSERT INTO media (file_name, original_name, file_url, file_type, file_size, media_category, alt_text, file_data)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [uniqueFileName, file.name, fileUrl, mimeType, file.size, category, altText, base64Data]
      );
      dbSuccess = true;
    } catch (dbErr: any) {
      console.warn('Database save warning for media:', dbErr?.message);
    }

    // 3. Fallback: If both disk and DB were unavailable, return data URL directly so image is never lost
    const finalUrl = (wroteToDisk || dbSuccess)
      ? fileUrl
      : `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      url: finalUrl,
      fileName: uniqueFileName,
      message: 'File uploaded successfully',
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error?.message || 'File upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
