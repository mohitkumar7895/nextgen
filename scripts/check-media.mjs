import mysql from 'mysql2/promise';

async function check() {
  const pool = mysql.createPool({ host: '127.0.0.1', port: 3306, user: 'root', password: '', database: 'nextgen' });
  const [tables] = await pool.query("SHOW TABLES LIKE 'media'");
  console.log('TABLES:', tables);
  if (tables.length > 0) {
    const [desc] = await pool.query('DESCRIBE media');
    console.log('DESCRIBE media:', desc);
  }
  await pool.end();
}

check().catch(console.error);
