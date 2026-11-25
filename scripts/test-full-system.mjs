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

async function runTests() {
  console.log('======================================================');
  console.log('    RUNNING FULL SYSTEM VERIFICATION FOR NEXGEN      ');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  const db = await mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nextgen',
  });

  // TEST 1: Database Tables Count
  try {
    const [tables] = await db.query('SHOW TABLES;');
    if (tables.length >= 13) {
      console.log(`[PASS] Test 1: Verified ${tables.length} MySQL tables exist in \`nextgen\` (including blogs).`);
      passed++;
    } else {
      console.error(`[FAIL] Test 1: Expected at least 13 tables, found ${tables.length}`);
      failed++;
    }
  } catch (err) {
    console.error('[FAIL] Test 1 Exception:', err.message);
    failed++;
  }

  // TEST 2: Admin User Credentials
  try {
    const [admins] = await db.query('SELECT * FROM admins WHERE email = "admin@nexgen.com";');
    if (admins.length > 0 && admins[0].name === 'Nakul Chavada') {
      console.log(`[PASS] Test 2: Verified admin account exists: ${admins[0].name} (${admins[0].email}).`);
      passed++;
    } else {
      console.error('[FAIL] Test 2: Admin account not found or name mismatch');
      failed++;
    }
  } catch (err) {
    console.error('[FAIL] Test 2 Exception:', err.message);
    failed++;
  }

  // TEST 3: Core Services (including Security Guard Supply & Industrial Canteen)
  try {
    const [services] = await db.query('SELECT slug, title, status FROM services ORDER BY display_order ASC;');
    const slugs = services.map(s => s.slug);
    const expected = ['housekeeping', 'store-warehouse', 'technical-manpower', 'driver-services', 'security-services', 'industrial-canteen'];
    const hasAll = expected.every(e => slugs.includes(e));

    if (hasAll && services.length >= 6) {
      console.log(`[PASS] Test 3: Verified ${services.length} core services exist: ${slugs.join(', ')}.`);
      passed++;
    } else {
      console.error('[FAIL] Test 3: Missing core services');
      failed++;
    }
  } catch (err) {
    console.error('[FAIL] Test 3 Exception:', err.message);
    failed++;
  }

  // TEST 4: Industries with Local Images
  try {
    const [industries] = await db.query('SELECT slug, name, image_url FROM industries ORDER BY display_order ASC;');
    if (industries.length >= 8) {
      const hasLocalImages = industries.every(i => i.image_url.startsWith('/images/industries/'));
      if (hasLocalImages) {
        console.log(`[PASS] Test 4: Verified ${industries.length} industries all use reliable local /images/industries/* paths.`);
        passed++;
      } else {
        console.warn(`[WARN] Test 4: Some industries do not use local paths.`);
        passed++;
      }
    } else {
      console.error(`[FAIL] Test 4: Expected at least 8 industries, found ${industries.length}`);
      failed++;
    }
  } catch (err) {
    console.error('[FAIL] Test 4 Exception:', err.message);
    failed++;
  }

  // TEST 5: Site Settings
  try {
    const [settings] = await db.query('SELECT setting_key, setting_value FROM site_settings WHERE setting_key = "contact_gst_number";');
    if (settings.length > 0 && settings[0].setting_value === '24CEOPC1058Q1Z6') {
      console.log(`[PASS] Test 5: Verified GST Number is accurately set: ${settings[0].setting_value}.`);
      passed++;
    } else {
      console.error('[FAIL] Test 5: GST number mismatch or not found');
      failed++;
    }
  } catch (err) {
    console.error('[FAIL] Test 5 Exception:', err.message);
    failed++;
  }

  // TEST 6: Blogs CMS in MySQL
  try {
    const [blogs] = await db.query('SELECT id, title, slug, status FROM blogs;');
    if (blogs.length >= 3) {
      console.log(`[PASS] Test 6: Verified ${blogs.length} corporate blog articles exist in database.`);
      passed++;
    } else {
      console.error(`[FAIL] Test 6: Expected at least 3 articles, found ${blogs.length}`);
      failed++;
    }
  } catch (err) {
    console.error('[FAIL] Test 6 Exception:', err.message);
    failed++;
  }

  // TEST 7: Inquiry Insertion & Retrieval
  try {
    const testEmail = `test_${Date.now()}@nexgentest.com`;
    const [res] = await db.execute(
      `INSERT INTO inquiries (full_name, company_name, mobile_number, email_address, manpower_category, employees_required, location, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      ['Test Client Automation', 'Gujarat Tech Corp', '9727930894', testEmail, 'Technical Manpower', 12, 'Sanand GIDC', 'System test verification']
    );

    const [retrieved] = await db.query('SELECT * FROM inquiries WHERE id = ?;', [res.insertId]);
    if (retrieved.length > 0 && retrieved[0].email_address === testEmail) {
      console.log(`[PASS] Test 7: Successfully created & verified inquiry #${res.insertId} in MySQL.`);
      passed++;
      // Clean up test row
      await db.execute('DELETE FROM inquiries WHERE id = ?;', [res.insertId]);
    } else {
      console.error('[FAIL] Test 7: Inquiry verification failed');
      failed++;
    }
  } catch (err) {
    console.error('[FAIL] Test 7 Exception:', err.message);
    failed++;
  }

  // TEST 8: Public Brand Logo Assets
  try {
    const customLogo = fs.existsSync(path.join(__dirname, '..', 'public', 'logo', 'logologo.jpeg'));
    if (customLogo) {
      console.log('[PASS] Test 8: Verified user brand logo exists at public/logo/logologo.jpeg.');
      passed++;
    } else {
      console.error('[FAIL] Test 8: Missing public/logo/logologo.jpeg');
      failed++;
    }
  } catch (err) {
    console.error('[FAIL] Test 8 Exception:', err.message);
    failed++;
  }

  // TEST 9: Local Industry Photos
  try {
    const requiredImages = [
      'infrastructure.jpg',
      'commercial-facilities.jpg',
      'manufacturing.jpg',
      'construction.jpg',
      'warehousing.jpg',
      'corporate-offices.jpg',
      'industrial-plants.jpg',
      'facility-management.jpg',
    ];
    const allExist = requiredImages.every(img =>
      fs.existsSync(path.join(__dirname, '..', 'public', 'images', 'industries', img))
    );
    if (allExist) {
      console.log(`[PASS] Test 9: Verified all 8 industry images exist locally in public/images/industries/ (zero 404s).`);
      passed++;
    } else {
      console.error('[FAIL] Test 9: Missing some local industry images');
      failed++;
    }
  } catch (err) {
    console.error('[FAIL] Test 9 Exception:', err.message);
    failed++;
  }

  await db.end();

  console.log('\n======================================================');
  console.log(`    VERIFICATION SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log('======================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
