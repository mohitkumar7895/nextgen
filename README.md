# NEXGEN WORKFORCE SERVICES – Corporate Website & Admin Portal

> **Brand Tagline:** Build People, Build Success.  
> **Headquarters:** Bavla, Ahmedabad, Gujarat, India.  
> **GSTIN:** `24CEOPC1058Q1Z6`  
> **Contact / Leadership:** CHAVADA NAKUL (+91 9727930894 / +91 9727930895)  

---

## 1. Project Overview
A modern, dynamic, and professional corporate website and content management portal engineered for **NEXGEN WORKFORCE SERVICES**, a premier manpower supply and workforce management enterprise in Gujarat, India.

The platform provides a high-converting digital experience designed for industrial plants, manufacturing units, 3PL logistics depots, and corporate office parks seeking vetted, disciplined, and compliant labor.

---

## 2. Technology Stack
- **Frontend Framework:** Next.js 14 (App Router) with TypeScript (`.tsx`)
- **Styling & UI:** Tailwind CSS, Custom Glassmorphism, Modern Geometric Typography
- **Icons & Graphics:** Lucide React, Custom 3D Vector SVG Brand Identity Assets
- **Database:** MySQL relational database (Database Name: `nextgen`)
- **Database Driver:** `mysql2/promise` with Connection Pooling (**No Prisma ORM**)
- **Forms & Validation:** React Hook Form & Zod
- **Analytics & Charts:** Recharts (Interactive bar & donut charts)
- **Authentication:** Cryptographic bcrypt password hashing (`bcryptjs`) + JWT sessions with `jose` stored in secure HTTP-only cookies
- **SEO & Social:** Dynamic XML Sitemap (`/sitemap.xml`), Robots.txt (`/robots.txt`), and Open Graph metadata

---

## 3. Brand Identity & Visual System
- **Primary Blue:** `#0647A5`
- **Deep Navy:** `#082C66`
- **Bright Blue:** `#079BEF`
- **Primary Orange:** `#FF6500`
- **Golden Yellow:** `#FFB900`
- **Dark Charcoal:** `#252B35`
- **White:** `#FFFFFF`
- **Light Background:** `#F4F8FC`

---

## 4. Website Pages & URL Architecture
- **Home Page (`/`)**:
  - 3D interactive hero section with canvas particles and floating manpower metric badges
  - Company Introduction with verified Gujarat roots
  - 4 Core Services:
    1. Housekeeping Services
    2. Store & Warehouse Staff
    3. Technical Manpower (Electricians/Fitters)
    4. Driver Services (Commercial/Transport)
  - Why Choose NexGen (8 core pillars)
  - Industries We Serve (8 core sectors)
  - Our 6-Step Workforce Process timeline
  - Live Animated Company Statistics counters
  - Bottom Call-to-Action banner
  - Interactive Contact & Google Maps integration
- **About Us (`/about`)**: Company Profile, Mission, Vision, Core Values, and Workforce Philosophy
- **Services Catalog (`/services`)**: Full service directory
- **Dynamic Service Details (`/services/[slug]`)**:
  - `/services/housekeeping`
  - `/services/store-warehouse`
  - `/services/technical-manpower`
  - `/services/driver-services`
  - Any dynamically added services from the Admin panel
- **Industries Served (`/industries`)**: Manufacturing, Construction, Warehousing, Corporate Offices, Commercial Facilities, Industrial Plants, Infrastructure, Facility Management
- **Contact Us (`/contact`)**: Registered office address, phone numbers, contact form, GST details, interactive map
- **Get a Quote (`/get-a-quote`)**: Full quotation form with instant WhatsApp follow-up link

---

## 5. Admin Management Portal (`/admin`)
- **Admin Access URL:** `/admin` (Redirects to `/admin/dashboard` or `/admin/login`)
- **Default Super Admin Credentials:**
  - **Email:** `admin@nexgen.com`
  - **Password:** `admin123`
- **Portal Modules:**
  1. **Dashboard Overview:** KPI metrics, monthly trends chart, category breakdown pie chart, recent inquiries table with quick status changer.
  2. **Website Content CMS:** Live editing for hero headlines, subheadings, CTAs, company introduction text, and statistics counters.
  3. **Services Management:** Full CRUD (Create, Read, Update, Delete) for services, responsibilities list editor, SLA benefits, slug management, and status toggle.
  4. **Inquiry & Quote Management:** Filter by status (`new`, `in_progress`, `contacted`, `converted`, `rejected`), modal view with internal notes logger, WhatsApp client chat trigger, and **RFC-4180 CSV export**.
  5. **Contact Details & Messages:** Manage primary/secondary phone numbers, WhatsApp, email, address, GST, and review contact messages.
  6. **Media Library:** Upload images directly to `/public/uploads/` and copy URLs.
  7. **SEO Management:** Meta titles, descriptions, keywords, canonical URLs, and sitemap inspection.
  8. **Security & Profile:** Admin name and email updates, and master password change.

---

## 6. Database Schema (MySQL)
The database contains 12 tables:
- `admins`
- `site_settings`
- `services`
- `industries`
- `testimonials`
- `statistics`
- `inquiries`
- `contact_messages`
- `media`
- `seo_metadata`
- `navigation_items`
- `social_links`

Schema SQL is located at `database/schema.sql` and default seed data at `database/seed.sql`.

---

## 7. Setup & Run Instructions

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env.local` and set your MySQL credentials:
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=nextgen
AUTH_SECRET=nexgen_enterprise_super_secret_jwt_key_2026_guarantee_secure_auth
```

### Step 3: Initialize Database Schema & Seed Data
```bash
npm run db:init
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

### Step 5: Build for Production
```bash
npm run build
npm run start
```
