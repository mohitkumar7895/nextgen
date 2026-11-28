import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

async function main() {
  // 1. Replace about-operations.jpg with automobile-engineers.jpg
  const src = path.join(process.cwd(), 'public', 'images', 'hero', 'automobile-engineers.jpg');
  const dest = path.join(process.cwd(), 'public', 'images', 'about', 'about-operations.jpg');
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Replaced about-operations.jpg with real automotive plant engineers photo!');
  }

  // 2. Update MySQL blogs table
  const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'nextgen',
  });

  // Blog 1: High-Tech Automobile Assembly Plant
  await pool.query(
    'UPDATE blogs SET image_url = ? WHERE id = 1',
    ['https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80']
  );

  // Blog 2: Industrial Safety Inspection & Factory Vest (NO suit, NO cloth, NO notebook)
  await pool.query(
    'UPDATE blogs SET image_url = ? WHERE id = 2',
    ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80']
  );

  // Blog 3: High-capacity Logistics Warehouse Forklift & High Racks
  await pool.query(
    'UPDATE blogs SET image_url = ? WHERE id = 3',
    ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80']
  );

  const [blogs] = await pool.query('SELECT id, slug, image_url FROM blogs');
  console.log('Updated Blogs in MySQL:', blogs);

  await pool.end();
  console.log('Successfully completed image updates!');
}

main().catch(console.error);
