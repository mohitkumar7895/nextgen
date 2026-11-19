import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

const targetDir = path.resolve('public/images/industries');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const list = [
  {
    slug: 'infrastructure',
    filename: 'infrastructure.jpg',
    url: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'commercial-facilities',
    filename: 'commercial-facilities.jpg',
    url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'manufacturing',
    filename: 'manufacturing.jpg',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'construction',
    filename: 'construction.jpg',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'warehousing-logistics',
    filename: 'warehousing.jpg',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'corporate-offices',
    filename: 'corporate-offices.jpg',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'industrial-plants',
    filename: 'industrial-plants.jpg',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'facility-management',
    filename: 'facility-management.jpg',
    url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
  },
];

async function run() {
  console.log('Downloading industry images locally...');
  for (const item of list) {
    const dest = path.join(targetDir, item.filename);
    try {
      const res = await fetch(item.url);
      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`[OK] Saved ${item.filename} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`[FAIL] ${item.filename}:`, err.message);
    }
  }

  // Update MySQL database to use local image paths: /images/industries/<filename>
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'nextgen',
    });

    console.log('Updating MySQL industries table with local paths...');
    for (const item of list) {
      const localPath = `/images/industries/${item.filename}`;
      await connection.execute(
        'UPDATE industries SET image_url = ? WHERE slug = ?',
        [localPath, item.slug]
      );
      console.log(`Updated ${item.slug} -> ${localPath}`);
    }

    const [rows] = await connection.query('SELECT slug, name, image_url FROM industries');
    console.log('Verified database rows:', rows);
    await connection.end();
  } catch (dbErr) {
    console.error('MySQL update error:', dbErr);
  }
}

run();
