import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env.local loader
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

async function runInit() {
  console.log('=====================================================');
  console.log('   INITIALIZING NEXGEN WORKFORCE SERVICES DATABASE   ');
  console.log('=====================================================');

  const dbHost = process.env.DB_HOST || '127.0.0.1';
  const dbPort = parseInt(process.env.DB_PORT || '3306', 10);
  const dbUser = process.env.DB_USER || 'root';
  const dbPassword = process.env.DB_PASSWORD || '';
  const dbName = process.env.DB_NAME || 'nextgen';

  console.log(`Connecting to MySQL at ${dbHost}:${dbPort} as user "${dbUser}"...`);

  let connection;
  try {
    connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      multipleStatements: true,
    });
    console.log('Connected to MySQL server successfully.');

    // 1. Ensure database exists
    console.log(`Ensuring database \`${dbName}\` exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`Database \`${dbName}\` created or verified.`);

    await connection.changeUser({ database: dbName });

    // 2. Execute schema.sql
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      console.log('Executing database/schema.sql...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await connection.query(schemaSql);
      console.log('Schema executed successfully.');
    }

    // 3. Execute seed.sql
    const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');
    if (fs.existsSync(seedPath)) {
      console.log('Executing database/seed.sql...');
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      await connection.query(seedSql);
      console.log('Seed data inserted successfully.');
    }

    // 4. Verify tables
    const [tables] = await connection.query('SHOW TABLES;');
    console.log(`\nVerified ${tables.length} tables in \`${dbName}\` database:`);
    for (const t of tables) {
      console.log(`  ✓ ${Object.values(t)[0]}`);
    }

    // 5. Verify admin user
    const [admins] = await connection.query('SELECT id, name, email, role FROM admins;');
    console.log('\nDefault Admin Account:');
    for (const a of admins) {
      console.log(`  User: ${a.name} (${a.email}) - Role: ${a.role}`);
    }

    console.log('\n=====================================================');
    console.log('   DATABASE INITIALIZATION COMPLETE FOR NEXGEN!      ');
    console.log('=====================================================\n');
  } catch (err) {
    console.error('Error during database initialization:', err);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runInit();
