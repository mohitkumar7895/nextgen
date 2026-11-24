import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...values] = trimmed.split('=');
        const val = values.join('=').trim().replace(/(^"|"$|^'|'$)/g, '');
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = val;
        }
      }
    });
  }
}

loadEnv();

async function downloadFile(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  console.log('Downloading:', url, '->', dest);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (res.ok) {
    const buf = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buf));
    console.log(`Saved ${dest} (${buf.byteLength} bytes)`);
  } else {
    throw new Error(`Failed to download ${url}: status ${res.status}`);
  }
}

async function run() {
  // 1. Download unique images for local storage
  // Unique car assembly line for Industry 1 (distinct from Hero Banner 1):
  await downloadFile(
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    'public/images/industries/automobile.jpg'
  );

  // Unique operations engineer for About Us / Company Intro:
  await downloadFile(
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1000&q=80',
    'public/images/about/about-operations.jpg'
  );

  // 2. Connect to MySQL and update services and blogs to ensure 100% unique images
  const db = await mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nextgen',
  });

  console.log('Updating MySQL services table with unique images...');
  // Service 2: Unique Automated Fulfillment Center
  await db.execute(
    `UPDATE services SET image_url = 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'store-warehouse';`
  );
  // Service 3: Unique Electrical & Mechanical Maintenance Engineer
  await db.execute(
    `UPDATE services SET image_url = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'technical-manpower';`
  );

  console.log('Updating MySQL blogs table with unique images...');
  // Blog 1: Unique automated manufacturing corridor plant
  await db.execute(
    `UPDATE blogs SET image_url = 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80' WHERE id = 1;`
  );
  // Blog 2: Corporate compliance executive
  await db.execute(
    `UPDATE blogs SET image_url = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80' WHERE id = 2;`
  );
  // Blog 3: Unique logistics distribution depot with container handling
  await db.execute(
    `UPDATE blogs SET image_url = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' WHERE id = 3;`
  );

  // Industry 1: Automobile & Industrial Manufacturing
  await db.execute(
    `UPDATE industries SET image_url = '/images/industries/automobile.jpg' WHERE id = 1;`
  );

  await db.end();
  console.log('All MySQL tables updated successfully with 100% unique image paths!');
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
