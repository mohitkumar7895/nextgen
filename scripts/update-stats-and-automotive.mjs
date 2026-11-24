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

async function updateData() {
  const db = await mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nextgen',
  });

  console.log('Connected to MySQL...');

  // 1. UPDATE STATISTICS: Replace confusing "12+ industries" and "150+ happy clients" with rock-solid metrics
  const newStats = [
    {
      id: 1,
      stat_key: 'workforce_deployed',
      label: 'Workforce Deployed',
      value: '5,000+',
      numeric_value: 5000,
      suffix: '+',
      icon_name: 'Users',
      display_order: 1,
    },
    {
      id: 2,
      stat_key: 'active_clients',
      label: 'Active Corporate Clients',
      value: '350+',
      numeric_value: 350,
      suffix: '+',
      icon_name: 'Building2',
      display_order: 2,
    },
    {
      id: 3,
      stat_key: 'retention_rate',
      label: 'Client Retention Rate',
      value: '99.2%',
      numeric_value: 99,
      suffix: '%',
      icon_name: 'Award',
      display_order: 3,
    },
    {
      id: 4,
      stat_key: 'compliance_rate',
      label: 'Statutory Compliance',
      value: '100%',
      numeric_value: 100,
      suffix: '%',
      icon_name: 'ShieldCheck',
      display_order: 4,
    },
  ];

  for (const s of newStats) {
    await db.execute(
      `INSERT INTO statistics (id, stat_key, label, value, numeric_value, suffix, icon_name, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         stat_key = VALUES(stat_key),
         label = VALUES(label),
         value = VALUES(value),
         numeric_value = VALUES(numeric_value),
         suffix = VALUES(suffix),
         icon_name = VALUES(icon_name),
         display_order = VALUES(display_order);`,
      [s.id, s.stat_key, s.label, s.value, s.numeric_value, s.suffix, s.icon_name, s.display_order]
    );
    console.log(`Updated statistic #${s.id}: ${s.label} (${s.value})`);
  }

  // 2. UPDATE INDUSTRIES: Feature Automobile & Auto Ancillary Manufacturing
  await db.execute(
    `UPDATE industries
     SET name = 'Automobile & Industrial Manufacturing',
         description = 'Precision workforce for automotive assembly lines, robotic welding, commercial vehicle plants, machine shops, and Tier-1 auto ancillaries.',
         image_url = '/images/industries/automobile.jpg',
         workforce_types = ?
     WHERE id = 1;`,
    [JSON.stringify(["Assembly Line Operators", "Robotic Welders", "Paint Shop Helpers", "Quality Inspectors", "Machine Operators"])]
  );
  console.log('Updated Industry #1 to Automobile & Industrial Manufacturing with /images/industries/automobile.jpg');

  await db.end();
  console.log('All MySQL data updated successfully!');
}

updateData().catch(err => {
  console.error('Update error:', err);
  process.exit(1);
});
