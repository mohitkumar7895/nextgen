import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

function searchImagesInDir(dir, imageMap = {}) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        searchImagesInDir(full, imageMap);
      }
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.mjs') || f.endsWith('.sql')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.matchAll(/(?:src|image_url|bgImage|avatar_url|og_image|cover_image|url)\s*[:=]\s*['"`]([^'"`]+\.(?:jpg|jpeg|png|webp|svg|gif)[^'"`]*)['"`]/gi);
      for (const m of matches) {
        const img = m[1].trim();
        if (img.includes('logo') || img.includes('icon') || img.includes('favicon')) continue;
        if (!imageMap[img]) imageMap[img] = [];
        imageMap[img].push(full);
      }
    }
  }
  return imageMap;
}

async function run() {
  console.log('==============================================');
  console.log('      DUPLICATE IMAGE VERIFICATION SCAN      ');
  console.log('==============================================\n');

  const allImages = new Map(); // normalized image -> locations

  function record(url, source) {
    const norm = url.trim().replace(/\?.*$/, ''); // ignore query params
    if (!allImages.has(norm)) allImages.set(norm, []);
    allImages.get(norm).push(source);
  }

  // 1. Hero Banners
  record('/images/hero/automobile-assembly-line.jpg', 'HeroSection: Banner 1 (Automobile Assembly Line)');
  record('/images/hero/automobile-robotics.jpg', 'HeroSection: Banner 2 (Automotive Precision Robotics)');
  record('/images/hero/automobile-plant-1.jpg', 'HeroSection: Banner 3 (Automotive Logistics & Vehicle Plant)');

  // 2. About Us & Office Location
  record('/images/about/about-operations.jpg', 'CompanyIntroSection: Operations Manager & Plant Floor');
  record('/images/office/office-location.jpg', 'QuickContactSection: Registered Office & Nakul Chavada Desk');

  // 3. MySQL Database entries
  try {
    const db = await mysql.createConnection({ host: '127.0.0.1', user: 'root', database: 'nextgen' });
    const [industries] = await db.query('SELECT id, name, image_url FROM industries;');
    industries.forEach(i => record(i.image_url, `Industry #${i.id}: ${i.name}`));

    const [services] = await db.query('SELECT id, title, image_url FROM services;');
    services.forEach(s => record(s.image_url, `Service #${s.id}: ${s.title}`));

    const [blogs] = await db.query('SELECT id, title, image_url FROM blogs;');
    blogs.forEach(b => record(b.image_url, `Blog #${b.id}: ${b.title}`));

    await db.end();
  } catch (e) {
    console.error('DB error:', e.message);
  }

  console.log(`Total unique visual slots checked: ${allImages.size}\n`);

  let duplicateCount = 0;
  for (const [img, locations] of allImages.entries()) {
    if (locations.length > 1) {
      console.warn(`[DUPLICATE DETECTED] ${img}`);
      locations.forEach(l => console.warn(`   -> ${l}`));
      duplicateCount++;
    } else {
      console.log(`[UNIQUE] ${img}`);
      console.log(`   Used exclusively in: ${locations[0]}`);
    }
  }

  console.log('\n==============================================');
  if (duplicateCount === 0) {
    console.log('ALL IMAGES ARE 100% UNIQUE! ZERO DUPLICATES FOUND.');
  } else {
    console.error(`FOUND ${duplicateCount} DUPLICATE IMAGES!`);
  }
  console.log('==============================================');
}

run();
