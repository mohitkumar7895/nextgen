export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    if (!filename) {
      return new NextResponse('Filename missing', { status: 400 });
    }

    // 1. Check if file exists on local filesystem
    try {
      const diskPath = path.join(process.cwd(), 'public', 'uploads', filename);
      if (fs.existsSync(diskPath)) {
        const fileBuffer = fs.readFileSync(diskPath);
        const ext = path.extname(filename).toLowerCase();
        const contentType =
          ext === '.png'
            ? 'image/png'
            : ext === '.webp'
            ? 'image/webp'
            : ext === '.svg'
            ? 'image/svg+xml'
            : 'image/jpeg';

        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    } catch {
      // Disk lookup failed or not found, proceed to database
    }

    // 2. Query from MySQL media table (Vercel serverless persistence)
    const row = await queryOne<{ file_data: string; file_type: string }>(
      'SELECT file_data, file_type FROM media WHERE file_name = ? LIMIT 1;',
      [filename]
    );

    if (row && row.file_data) {
      const buffer = Buffer.from(row.file_data, 'base64');
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': row.file_type || 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    return new NextResponse('Image not found', { status: 404 });
  } catch (error: any) {
    console.error('Serve uploaded image error:', error);
    return new NextResponse('Internal error loading image', { status: 500 });
  }
}
