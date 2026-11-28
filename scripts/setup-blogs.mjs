import mysql from 'mysql2/promise';

async function setupBlogs() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'nextgen',
  });

  console.log('Connected to MySQL');

  // 1. Create blogs table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(191) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      content LONGTEXT NOT NULL,
      category VARCHAR(100) NOT NULL DEFAULT 'Workforce Management',
      author VARCHAR(100) NOT NULL DEFAULT 'Nakul Chavada',
      read_time VARCHAR(50) NOT NULL DEFAULT '5 min read',
      image_url VARCHAR(500) NOT NULL,
      is_featured BOOLEAN NOT NULL DEFAULT FALSE,
      status ENUM('published', 'draft') NOT NULL DEFAULT 'published',
      meta_title VARCHAR(255) NULL,
      meta_description TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_blog_status (status),
      INDEX idx_blog_category (category),
      INDEX idx_blog_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log('Created blogs table successfully');

  // 2. Seed 3 initial corporate articles
  const initialBlogs = [
    {
      slug: 'gujarat-industrial-manpower-trends-2025',
      title: 'Navigating Industrial Manpower Demand in Gujarat’s Manufacturing Corridors',
      category: 'Workforce Management',
      author: 'Nakul Chavada',
      read_time: '4 min read',
      image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      is_featured: 1,
      status: 'published',
      excerpt: 'How Gujarat’s rapid manufacturing expansion across Sanand, Bavla, and Changodar is transforming skilled technical labor requirements and deployment benchmarks.',
      content: `Gujarat stands at the epicenter of India's manufacturing renaissance. From the automotive clusters in Sanand to the heavy engineering corridors of Bavla and Changodar, industrial enterprises are demanding precision manpower that delivers zero-downtime productivity from Day 1.

### 1. The Shift Toward Multidisciplinary Technical Talent
Traditional manual labor recruitment is no longer sufficient for modern automated production lines. Factories increasingly require certified industrial electricians and mechanical maintenance fitters with hands-on experience in PLC machinery, preventive maintenance, and strict Lock-Out/Tag-Out (LOTO) safety protocols.

### 2. Rapid Mobilization & Zero Deployment Delays
In high-velocity manufacturing, an unstaffed shift can result in tens of thousands of rupees in lost production output. Partnering with a localized staffing provider that maintains pre-vetted candidate pools enables enterprises to scale headcount up or down within 24 to 48 hours without compromising on credential verification.

### 3. Comprehensive Statutory Peace of Mind
With strict labor department inspections, businesses cannot afford statutory lapses. Full compliance with Provident Fund (PF), Employee State Insurance (ESIC), professional tax, and minimum wage mandates is the hallmark of a dependable workforce management partnership.`,
      meta_title: 'Industrial Manpower Trends in Gujarat | NexGen Workforce Services',
      meta_description: 'Discover how Gujarat manufacturing corridors in Sanand and Bavla are scaling skilled industrial labor with NexGen Workforce Services.'
    },
    {
      slug: 'statutory-compliance-esic-pf-workforce-safety',
      title: 'The Essential Guide to Statutory Labor Compliance: PF, ESIC & Workplace Safety',
      category: 'Compliance & Regulations',
      author: 'Nakul Chavada',
      read_time: '5 min read',
      image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      is_featured: 1,
      status: 'published',
      excerpt: 'Why 100% adherence to Provident Fund, ESIC, and factory safety protocols is non-negotiable for enterprise manufacturing plants and logistics hubs.',
      content: `Statutory labor compliance is the cornerstone of sustainable enterprise operations. For industrial plants and commercial corporations, partnering with a non-compliant staffing vendor poses immense legal, financial, and reputational liabilities.

### What Complete Statutory Compliance Entails
At NexGen Workforce Services, every deployed employee is backed by 100% auditable documentation:
- **Employee Provident Fund (EPF):** Monthly deposits with transparent UAN issuance.
- **Employee State Insurance (ESIC):** Immediate medical benefits card issuance for employees and dependents.
- **Factory Act & Workplace Safety:** Certified safety shoes, high-visibility jackets, and mandatory PPE protocol induction before entering client premises.
- **Biometric Attendance Tracking:** Error-free muster roll management aligned with exact wage disbursal timelines.

By removing administrative friction and compliance risk, NexGen allows factory owners and facility directors to focus purely on core business growth.`,
      meta_title: 'Statutory Labor Compliance Guide | PF, ESIC & Safety | NexGen',
      meta_description: 'Understand the critical importance of 100% PF and ESIC statutory compliance in industrial staffing across Gujarat.'
    },
    {
      slug: 'optimizing-warehouse-logistics-staffing',
      title: 'Scaling Warehouse Logistics & Material Handling Teams for Peak Demand',
      category: 'Staffing Insights',
      author: 'Nakul Chavada',
      read_time: '4 min read',
      image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      is_featured: 1,
      status: 'published',
      excerpt: 'Best practices for managing storekeepers, inventory controllers, packaging crews, and heavy commercial drivers during festive and supply chain peaks.',
      content: `Third-party logistics (3PL) centers, cold storage facilities, and e-commerce distribution warehouses in Bavla and Ahmedabad face sharp operational spikes. Managing these surges requires agile, trained material handling staff capable of operating warehouse management systems (WMS).

### Key Roles for Frictionless Depot Operations
1. **ERP/WMS Storekeepers:** Handling real-time SKU inwarding, binning, and inventory reconciliation.
2. **Order Pickers & Packaging Crews:** Ensuring high-speed order fulfillment with zero damage rates.
3. **Heavy Commercial & Shuttle Drivers:** Licensed, verified drivers who maintain safe transit and route discipline across Gujarat state highways.

NexGen Workforce Services provides flexible staffing models with dedicated on-site team supervisors, ensuring your supply chain never misses a shipment deadline.`,
      meta_title: 'Warehouse & Logistics Staffing Best Practices | NexGen Workforce',
      meta_description: 'Learn how to scale warehouse inventory staff, storekeepers, and commercial drivers efficiently with NexGen Workforce Services.'
    }
  ];

  for (const b of initialBlogs) {
    await connection.execute(`
      INSERT INTO blogs (slug, title, category, author, read_time, image_url, is_featured, status, excerpt, content, meta_title, meta_description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title=VALUES(title),
        category=VALUES(category),
        excerpt=VALUES(excerpt),
        content=VALUES(content),
        image_url=VALUES(image_url),
        status=VALUES(status);
    `, [
      b.slug, b.title, b.category, b.author, b.read_time, b.image_url,
      b.is_featured, b.status, b.excerpt, b.content, b.meta_title, b.meta_description
    ]);
  }

  const [count] = await connection.query('SELECT COUNT(*) as total FROM blogs');
  console.log('Total blogs in database:', count[0].total);

  await connection.end();
}

setupBlogs().catch((err) => {
  console.error('Blog setup error:', err);
  process.exit(1);
});
