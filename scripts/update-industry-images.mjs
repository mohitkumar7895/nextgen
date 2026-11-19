import mysql from 'mysql2/promise';

async function updateImages() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'nextgen',
  });

  console.log('Connected to MySQL');

  await connection.execute(
    'UPDATE industries SET image_url = ? WHERE slug = ?',
    [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
      'commercial-facilities'
    ]
  );
  console.log('Updated commercial-facilities image');

  await connection.execute(
    'UPDATE industries SET image_url = ? WHERE slug = ?',
    [
      'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
      'infrastructure'
    ]
  );
  console.log('Updated infrastructure image');

  const [rows] = await connection.query('SELECT slug, name, image_url FROM industries WHERE slug IN ("commercial-facilities", "infrastructure")');
  console.log('Verified updated rows:', rows);

  await connection.end();
}

updateImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
