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

async function run() {
  const db = await mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nextgen',
  });

  console.log('Connected to MySQL...');

  // 1. ADD / UPDATE SERVICE 5: Company Security Guard Supply
  await db.execute(
    `INSERT INTO services (
      id, slug, title, subtitle, short_description, full_description,
      icon_name, image_url, banner_url,
      key_responsibilities, benefits, industry_applications,
      status, display_order, meta_title, meta_description
    ) VALUES (
      5, 'security-services', 'Company Security Guard Supply', 'Licensed Corporate & Industrial Security Guards',
      'Certified security guard supply, factory gate security, material inward-outward logs, perimeter surveillance, and 24/7 corporate asset protection across Gujarat.',
      'In fast-paced manufacturing plants, logistics warehouses, and corporate facilities, reliable security is vital to preventing unauthorized entry, theft, and operational disruption. NexGen Workforce Services supplies trained, police-verified, and disciplined security guards tailored to exact industrial and commercial protocols. From 24/7 gate security and visitor logs to material pass authorization, CCTV monitoring, and fire safety protocols, our personnel ensure absolute peace of mind.',
      'ShieldCheck', '/images/services/security-service.jpg', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=80',
      ?, ?, ?, 'active', 5,
      'Company Security Guard Supply in Gujarat | Industrial & Corporate Security | NexGen',
      'Hire trained, verified security guards for industrial plants, factories, and corporate offices from NexGen Workforce Services in Ahmedabad, Gujarat.'
    ) ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      subtitle = VALUES(subtitle),
      short_description = VALUES(short_description),
      full_description = VALUES(full_description),
      icon_name = VALUES(icon_name),
      image_url = VALUES(image_url),
      banner_url = VALUES(banner_url),
      key_responsibilities = VALUES(key_responsibilities),
      benefits = VALUES(benefits),
      industry_applications = VALUES(industry_applications),
      display_order = VALUES(display_order);`,
    [
      JSON.stringify([
        "24/7 Factory gate access control and vehicle entry/exit inspections",
        "Daily visitor registry, contractor badge issuance, and biometric verification",
        "Material inward and outward delivery challan verification and log management",
        "Round-the-clock perimeter foot patrolling and emergency gate response",
        "CCTV console surveillance and immediate incident reporting",
        "First-aid response, fire extinguisher handling, and evacuation protocols"
      ]),
      JSON.stringify([
        "100% Police-verified, disciplined, and uniformed security personnel",
        "Drastic reduction in plant pilferage, inventory loss, and unauthorized access",
        "Round-the-clock 24/7/365 shift rotation with guaranteed replacements",
        "Complete statutory and labor compliance (PF, ESIC, insurance) handled by NexGen",
        "On-site security head inspections and transparent daily incident logs"
      ]),
      JSON.stringify([
        "Automobile & Heavy Manufacturing Plants",
        "Warehousing, Logistics Hubs & Container Freight Stations",
        "Chemical, Petrochemical & Pharma Complexes",
        "Corporate IT Parks & Commercial Office Towers",
        "Shopping Malls, Multiplexes & Retail Centers"
      ])
    ]
  );
  console.log('Added / updated Service #5: Company Security Guard Supply');

  // 2. ADD / UPDATE SERVICE 6: Industrial Canteen Services
  await db.execute(
    `INSERT INTO services (
      id, slug, title, subtitle, short_description, full_description,
      icon_name, image_url, banner_url,
      key_responsibilities, benefits, industry_applications,
      status, display_order, meta_title, meta_description
    ) VALUES (
      6, 'industrial-canteen', 'Industrial Canteen Services', 'Turnkey Factory Canteen & Industrial Catering Staffing',
      'End-to-end industrial canteen management, professional commercial head cooks, kitchen helpers, hygienic food serving, and scheduled meal operations for industrial shifts.',
      'Wholesome, hygienic, and punctual meals are vital to maintaining workforce morale, health, and shift productivity in industrial plants. NexGen Workforce Services provides complete turnkey canteen workforce management for factories, manufacturing clusters, and logistics depots. Our teams comprise certified head cooks, kitchen assistants, dining attendants, and sanitation staff trained in strict FSSAI food hygiene practices. We manage daily breakfast, lunch, dinner, and midnight shift tea/snacks with disciplined punctuality.',
      'Utensils', '/images/services/canteen-service.jpg', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80',
      ?, ?, ?, 'active', 6,
      'Industrial Canteen Services & Factory Kitchen Staff in Gujarat | NexGen',
      'Professional industrial canteen workforce, cooks, kitchen helpers, and factory meal management services by NexGen Workforce Services in Ahmedabad, Gujarat.'
    ) ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      subtitle = VALUES(subtitle),
      short_description = VALUES(short_description),
      full_description = VALUES(full_description),
      icon_name = VALUES(icon_name),
      image_url = VALUES(image_url),
      banner_url = VALUES(banner_url),
      key_responsibilities = VALUES(key_responsibilities),
      benefits = VALUES(benefits),
      industry_applications = VALUES(industry_applications),
      display_order = VALUES(display_order);`,
    [
      JSON.stringify([
        "Full-scale kitchen meal preparation for factory morning, evening, and night shifts",
        "Hygienic vegetable cutting, grain cleaning, and food storage in compliance with FSSAI",
        "Punctual shift-time food serving, buffet counter management, and dining hall assistance",
        "Post-meal commercial dishwashing, kitchen deep cleaning, and waste management",
        "Inventory tracking, raw ingredient inwarding, and kitchen equipment sanitization",
        "Continuous hot tea/coffee and snack distribution to plant floor shift workers"
      ]),
      JSON.stringify([
        "Hot, nutritious, and hygienic meals served strictly on factory shift schedules",
        "Strict adherence to FSSAI food safety regulations and worker health checkups",
        "Zero plant management headache for kitchen hiring, attendance, and chef absenteeism",
        "Customizable menus tailored to worker preferences, executive staff, and festival occasions",
        "Uniformed, cap/glove-equipped staff maintaining impeccable food handling hygiene"
      ]),
      JSON.stringify([
        "Automobile Assembly & Ancillary Plants",
        "Heavy Engineering, Fabrication & Machinery Units",
        "Large-scale 3PL Warehouses & Logistics Depots",
        "Textile Mills, Garment Units & Chemical Refineries",
        "Corporate Campuses & Technology Hubs"
      ])
    ]
  );
  console.log('Added / updated Service #6: Industrial Canteen Services');

  // 3. UPDATE SITE SETTINGS WITH EXACT GPS LOCATION FROM USER PHOTO
  const exactAddress = 'Ratna Sagar, 1st Floor, Shop No. A-105, Survey No. 335 A/B/K, Near Kerala Bridge (Plus Code: Q8JF+VHG), Kerala, Bavla, Ahmedabad, Gujarat – 382220, India.';
  const mapEmbedUrl = 'https://maps.google.com/maps?q=22.781100,72.324649&hl=en&z=17&output=embed';

  const settingsToUpdate = [
    { key: 'contact_address', value: exactAddress, group: 'contact', desc: 'Full Registered Address with Plus Code' },
    { key: 'contact_map_embed', value: mapEmbedUrl, group: 'contact', desc: 'Google Maps Embed URL' },
    { key: 'contact_plus_code', value: 'Q8JF+VHG, Kerala, Gujarat 382220, India', group: 'contact', desc: 'Google Plus Code' },
    { key: 'contact_latitude', value: '22.781100', group: 'contact', desc: 'GPS Latitude' },
    { key: 'contact_longitude', value: '72.324649', group: 'contact', desc: 'GPS Longitude' },
    { key: 'contact_locality', value: 'Kerala / Near Kerala Bridge, Bavla', group: 'contact', desc: 'Locality' }
  ];

  for (const s of settingsToUpdate) {
    await db.execute(
      `INSERT INTO site_settings (setting_key, setting_value, setting_group, description)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), description = VALUES(description);`,
      [s.key, s.value, s.group, s.desc]
    );
    console.log(`Updated setting: ${s.key}`);
  }

  await db.end();
  console.log('Migration completed successfully!');
}

run().catch(err => {
  console.error('Fatal migration error:', err);
  process.exit(1);
});
