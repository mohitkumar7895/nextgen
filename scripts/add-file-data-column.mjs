import mysql from 'mysql2/promise';

async function main() {
  const pool = mysql.createPool({ host: '127.0.0.1', port: 3306, user: 'root', password: '', database: 'nextgen' });
  try {
    await pool.query('ALTER TABLE media ADD COLUMN IF NOT EXISTS file_data LONGTEXT NULL AFTER alt_text;');
    console.log('Added file_data column to media table (or it already exists).');
  } catch (err) {
    // If IF NOT EXISTS syntax not supported by this MySQL version, try without it
    try {
      await pool.query('ALTER TABLE media ADD COLUMN file_data LONGTEXT NULL AFTER alt_text;');
      console.log('Added file_data column to media table.');
    } catch (e) {
      console.log('Column may already exist:', e.message);
    }
  }

  const [desc] = await pool.query('DESCRIBE media');
  console.log('Updated media schema:', desc.map(d => ({ field: d.Field, type: d.Type })));
  await pool.end();
}

main().catch(console.error);
