-- ==============================================================================
-- NEXGEN WORKFORCE SERVICES - SEED DATA
-- Database: nextgen
-- ==============================================================================

USE `nextgen`;

-- 1. ADMIN USER (Password: admin123)
INSERT INTO `admins` (`id`, `name`, `email`, `password_hash`, `role`) VALUES
(1, 'Nakul Chavada', 'admin@nexgen.com', '$2a$10$/.CLeJ/ZWQtyy5wxbSH1/uLvHqY.RFLTJAlV5gOAXZpxUXafCX4a.', 'super_admin')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 2. SITE SETTINGS
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `setting_group`, `description`) VALUES
('company_name', 'NEXGEN WORKFORCE SERVICES', 'general', 'Official Company Name'),
('brand_tagline', 'Build People, Build Success.', 'general', 'Official Brand Tagline'),
('business_category', 'Manpower Supply & Workforce Services', 'general', 'Business Category'),
('client_contact_name', 'CHAVADA NAKUL', 'contact', 'Primary Contact / Proprietor Name'),
('contact_phone_primary', '9727930894', 'contact', 'Primary Contact Number'),
('contact_phone_secondary', '9727930895', 'contact', 'Secondary Contact Number'),
('contact_whatsapp', '9727930894', 'contact', 'Official WhatsApp Number'),
('contact_email', 'nexgenworkforce@gmail.com', 'contact', 'Official Contact Email'),
('contact_gst_number', '24CEOPC1058Q1Z6', 'compliance', 'Registered GST Number'),
('contact_address', 'Ratna Sagar, 1st Floor, Shop No. A-105, Survey No. 335 A/B/K, Near Kerala Bridge, Bavla, Ahmedabad, Gujarat – 382220, India.', 'contact', 'Full Registered Address'),
('contact_locality', 'Bavla / Kerala Bridge', 'contact', 'Locality'),
('contact_district', 'Ahmedabad', 'contact', 'District'),
('contact_state', 'Gujarat', 'contact', 'State'),
('contact_pincode', '382220', 'contact', 'PIN Code'),
('contact_country', 'India', 'contact', 'Country'),
('contact_map_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14697.55018654817!2d72.35515286576882!3d22.843793754432095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e865f9ff7ff25%3A0xbc7d54b726487e41!2sBavla%2C%20Gujarat%20382220!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin', 'contact', 'Google Maps Embed URL'),

-- Hero Section Settings
('hero_heading', 'Building Stronger Workforces. Empowering Better Businesses.', 'hero', 'Homepage Hero Main Headline'),
('hero_subheading', 'Your Trusted Partner for Skilled Manpower, Professional Staffing and Reliable Workforce Solutions.', 'hero', 'Homepage Hero Subheading'),
('hero_cta_primary_text', 'Get Workforce Solutions', 'hero', 'Hero Primary Button Text'),
('hero_cta_primary_link', '/get-a-quote', 'hero', 'Hero Primary Button Link'),
('hero_cta_secondary_text', 'Contact Our Team', 'hero', 'Hero Secondary Button Text'),
('hero_cta_secondary_link', '/contact', 'hero', 'Hero Secondary Button Link'),

-- Company Intro Settings
('company_intro_badge', 'About NexGen Workforce Services', 'intro', 'Badge text above introduction'),
('company_intro_heading', 'Your Trusted Workforce Partner', 'intro', 'Homepage Company Introduction Heading'),
('company_intro_text', 'NexGen Workforce Services provides reliable, skilled and trained manpower solutions to businesses across multiple industries. We focus on delivering professional workforce support, dependable staffing services and quality manpower management.', 'intro', 'Homepage Company Introduction Main Text'),
('company_intro_highlight', 'Headquartered in Bavla, Ahmedabad, we bridge industrial enterprises with vetted, disciplined and performance-driven manpower tailored to exact operational workflows.', 'intro', 'Homepage Company Introduction Secondary Text'),

-- CTA Banner Settings
('cta_heading', 'Need Reliable Manpower for Your Business?', 'cta', 'Bottom CTA Section Title'),
('cta_description', 'Let NexGen Workforce Services help you find the right workforce for your business requirements. Fast deployment, verified talent, and complete statutory peace of mind.', 'cta', 'Bottom CTA Section Subtitle'),
('cta_button_text', 'Request a Quote', 'cta', 'CTA Button Label'),
('cta_button_link', '/get-a-quote', 'cta', 'CTA Button URL')

ON DUPLICATE KEY UPDATE `setting_value`=VALUES(`setting_value`);

-- 3. SERVICES (4 CORE SERVICES)
INSERT INTO `services` (`id`, `slug`, `title`, `subtitle`, `short_description`, `full_description`, `icon_name`, `image_url`, `banner_url`, `key_responsibilities`, `benefits`, `industry_applications`, `status`, `display_order`, `meta_title`, `meta_description`) VALUES
(1, 'housekeeping', 'Housekeeping Services', 'Professional Cleaning, Hygiene & Facility Maintenance Personnel',
'Professional housekeeping staff, cleaning and maintenance personnel, and facility support staff trained to maintain immaculate, hygienic, and compliant corporate and industrial environments.',
'NexGen Workforce Services supplies high-caliber housekeeping professionals and sanitation teams tailored for industrial plants, corporate towers, logistics parks, healthcare centers, and educational campuses across Gujarat. Our personnel undergo rigorous training in chemical safety, mechanized cleaning equipment handling, waste segregation, and high-frequency disinfection protocols to safeguard workplace hygiene and elevate brand prestige.',
'Sparkles',
'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80',
'["Daily comprehensive cleaning and chemical disinfection of corporate and production floors", "Restroom and pantry hygiene maintenance using color-coded sanitization tools", "Waste management, segregation, and eco-friendly municipal disposal compliance", "Industrial floor scrubbing, polishing, and specialized vacuum maintenance", "Deep cleaning schedules for glass facades, vents, and difficult overhead spaces", "Inventory monitoring and replenishment of facility consumable supplies"]',
'["Pristine facility aesthetics that reflect top-tier corporate professionalism", "Fully vetted, verified and uniformed workforce with personal identity checks", "Flexible shift deployments including 24/7/365 round-the-clock rotations", "Complete statutory and labor compliance (PF, ESIC, insurance) handled by NexGen", "On-site team leaders and supervisors ensuring strict SLA accountability"]',
'["Corporate Headquarters & IT Hubs", "Manufacturing Plants & Cleanrooms", "Hospitals & Diagnostic Centers", "Warehousing & Fulfillment Centers", "Commercial Shopping Malls & Showrooms"]',
'active', 1,
'Professional Housekeeping Services in Gujarat | NexGen Workforce',
'Hire trained housekeeping staff, cleaning personnel, and facility maintenance teams from NexGen Workforce Services in Ahmedabad, Gujarat.'),

(2, 'store-warehouse', 'Store & Warehouse Staff', 'Expert Storekeepers, Inventory Handlers & Logistics Assistants',
'Storekeepers, warehouse assistants, inventory management staff, and packing and loading personnel engineered for rapid, error-free supply chain operations.',
'In fast-paced logistics and manufacturing environments, inventory accuracy and turnaround speed dictate profitability. NexGen provides disciplined, technically capable store and warehouse personnel who excel in inventory auditing, barcode scanning, binning, picking, packing, and dispatch operations. Whether managing heavy industrial raw materials or high-velocity FMCG items, our staff integrates seamlessly into your Warehouse Management System (WMS).',
'Package',
'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80',
'["Systematic material inwarding, verification against PO/GRN, and damage inspection", "Precision racking, bin allocation, and barcode tracking in ERP/WMS databases", "FIFO/LIFO stock rotation and periodic physical cycle count reconciliations", "High-velocity order picking, secure packaging, bundling, and shrink-wrapping", "Safe loading, unloading, and pallet staging using hand pallet trucks (HPT)", "Immediate discrepancy reporting, loss prevention, and scrap management"]',
'["Drastic reduction in material transit damage and picking errors", "Accelerated dispatch timelines and improved on-time order fulfillment rates", "Scalable workforce scaling during festive peaks and manufacturing spikes", "Trained in industrial warehouse safety, PPE usage, and ergonomics", "Zero administrative burden for recruitment, background screening, and payroll"]',
'["E-Commerce Fulfillment Centers", "3PL & Cold Storage Logistics Warehouses", "Automotive Ancillary & Engineering Stores", "FMCG, Food & Retail Distribution Hubs", "Pharmaceutical & Chemical Depots"]',
'active', 2,
'Warehouse Staff & Storekeepers Supply | NexGen Workforce Services',
'Dependable storekeepers, warehouse helpers, packers, and inventory management staff for logistics and industrial facilities in Gujarat.'),

(3, 'technical-manpower', 'Technical Manpower', 'Certified Electricians, Mechanical & Maintenance Technicians',
'Electricians, mechanical technicians, maintenance technicians, and industrial technical staff dedicated to sustaining maximum machine uptime and zero operational disruptions.',
'Modern factories and engineering infrastructure depend on skilled hands to keep critical machinery humming. NexGen supplies vetted, certified technical manpower across mechanical, electrical, instrumentation, and utility domains. Our technicians possess real-world factory experience, interpret technical blueprints with ease, and adhere rigorously to industrial Lockout/Tagout (LOTO) and safety protocols.',
'Wrench',
'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80',
'["Routine, preventive, and emergency breakdown maintenance on industrial machinery", "High and low-voltage electrical panel servicing, wiring, and motor troubleshooting", "Hydraulic and pneumatic mechanical servicing, pump overhauls, and valve checks", "Precision equipment alignment, lubrication, belt tightening, and vibration audits", "Adherence to factory safety guidelines, permit-to-work systems, and LOTO standards", "Maintenance logs documentation, breakdown analysis, and spare parts requisition"]',
'["Significant reduction in unplanned factory downtime and production losses", "Thoroughly tested and trade-certified technical candidates ready for work", "Rapid deployment for annual turnaround, plant overhauls, and urgent shifts", "Strict compliance with Factory Act norms, worker safety, and statutory standards", "Continuous upskilling initiatives by NexGen senior technical coordinators"]',
'["Heavy Manufacturing & Engineering Units", "Chemical, Petrochemical & Fertilizer Plants", "Automobile & Ancillary Production Plants", "Textile Mills & Ceramic Industries", "Power Generation & Renewable Solar/Wind Facilities"]',
'active', 3,
'Skilled Technical Manpower Supply | Electricians & Technicians | NexGen',
'Certified electricians, mechanical maintenance technicians, and industrial technical workforce for factories and manufacturing plants across Gujarat.'),

(4, 'driver-services', 'Driver Services', 'Licensed Commercial Fleet, Transport & Executive Drivers',
'Professional drivers, commercial vehicle drivers, and transportation support staff with valid licensing, verified road records, and dependable punctuality.',
'NexGen Workforce Services delivers experienced, commercially licensed drivers for corporate fleets, employee shuttles, heavy transport vehicles, and executive transport. Our drivers undergo rigorous background verification, motor vehicle records checks, and defensive driving assessments to guarantee safe cargo transit and reliable executive mobility.',
'Truck',
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=80',
'["Safe operation of commercial trucks, multi-axle trailers, and industrial freight vehicles", "Executive chauffeur services for corporate management, VIP guests, and delegates", "Staff shuttle and passenger van operations with adherence to strict time schedules", "Daily pre-trip vehicle safety inspection: fluid levels, tires, brakes, and headlights", "Strict adherence to RTO traffic guidelines, lane discipline, and speed limits", "Accurate trip log sheets, toll fee management, fuel receipts, and route optimization"]',
'["Zero-tolerance road safety policy with verified clean driving records", "Pre-screened candidates with active commercial licenses and background verification", "Thorough familiarity with Ahmedabad, Gujarat state highways, and national corridors", "Punctual, disciplined, uniformed, and customer-focused demeanor", "Guaranteed backup drivers available on short notice to avoid transit bottlenecks"]',
'["Corporate Transportation & Corporate Fleet Management", "Heavy Commercial Logistics & Inter-State Freight", "Employee Transportation & Staff Shuttle Bus Fleets", "Express Courier, Parcel & Intra-City Delivery Networks", "Construction & Infrastructure Site Heavy Vehicle Fleets"]',
'active', 4,
'Commercial & Corporate Driver Services | NexGen Workforce Services',
'Professional commercial vehicle drivers, heavy transport operators, and corporate chauffeurs in Ahmedabad and Gujarat.')
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`), `short_description`=VALUES(`short_description`);

-- 4. INDUSTRIES (8 CORE INDUSTRIES)
INSERT INTO `industries` (`id`, `slug`, `name`, `description`, `icon_name`, `image_url`, `workforce_types`, `status`, `display_order`) VALUES
(1, 'manufacturing', 'Manufacturing & Heavy Industry', 'Complete staffing solutions for assembly lines, fabrication plants, and heavy manufacturing units across industrial clusters.', 'Factory', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', '["Assembly Line Operators", "Machine Helpers", "Welding Technicians", "Quality Inspectors", "Material Handlers"]', 'active', 1),
(2, 'construction', 'Construction & Real Estate', 'Skilled and general construction workforce for residential, commercial, and industrial construction ventures.', 'HardHat', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', '["Site Helpers", "Masons", "Carpenters", "Bar Benders", "Safety Marshals"]', 'active', 2),
(3, 'warehousing-logistics', 'Warehousing & Logistics', 'High-speed workforce for 3PL depots, cold storages, fulfillment centers, and distribution terminals.', 'Boxes', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', '["Storekeepers", "Pickers & Packers", "Loading Unloading Staff", "Forklift Operators", "Inventory Auditors"]', 'active', 3),
(4, 'corporate-offices', 'Corporate Offices & IT Hubs', 'Polished, professional support staff and administrative workforce for modern corporate workplaces.', 'Building2', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', '["Corporate Housekeeping", "Pantry Boys", "Office Assistants", "Front Desk Support", "Security Staff"]', 'active', 4),
(5, 'commercial-facilities', 'Commercial Facilities & Malls', 'Comprehensive facility management workforce maintaining cleanliness, hygiene, and guest satisfaction.', 'Store', 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80', '["Floor Cleaners", "Maintenance Staff", "Customer Greeters", "Restroom Attendants", "Waste Handlers"]', 'active', 5),
(6, 'industrial-plants', 'Industrial Plants & Refineries', 'Rigorous, safety-compliant technical labor for chemical, processing, and pharmaceutical industrial complexes.', 'Cpu', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', '["Maintenance Technicians", "Boiler Operators", "Utility Assistants", "EHS Compliance Monitors", "Line Helpers"]', 'active', 6),
(7, 'infrastructure', 'Infrastructure & Highways', 'Dedicated project workforce for roads, bridges, metro projects, and urban development corridors.', 'Waypoints', 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80', '["Commercial Drivers", "Heavy Equipment Operators", "Site Supervisors", "Civil Assistants", "Traffic Marshals"]', 'active', 7),
(8, 'facility-management', 'Facility Management Services', 'Turnkey workforce solutions for residential societies, educational institutions, and healthcare properties.', 'ShieldCheck', 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80', '["Multi-Skilled Technicians", "Sanitization Crew", "Gardeners", "Plumbers", "Electricians"]', 'active', 8)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `description`=VALUES(`description`);

-- 5. STATISTICS
INSERT INTO `statistics` (`id`, `stat_key`, `label`, `value`, `numeric_value`, `suffix`, `icon_name`, `display_order`) VALUES
(1, 'workforce_deployed', 'Workforce Deployed', '5,000+', 5000, '+', 'Users', 1),
(2, 'industries_served', 'Industries Served', '12+', 12, '+', 'Factory', 2),
(3, 'skilled_professionals', 'Skilled Professionals', '3,500+', 3500, '+', 'Briefcase', 3),
(4, 'happy_clients', 'Happy Corporate Clients', '150+', 150, '+', 'Smile', 4)
ON DUPLICATE KEY UPDATE `label`=VALUES(`label`), `value`=VALUES(`value`), `numeric_value`=VALUES(`numeric_value`);

-- 6. TESTIMONIALS
INSERT INTO `testimonials` (`id`, `client_name`, `client_designation`, `company_name`, `feedback`, `rating`, `avatar_url`, `status`, `display_order`) VALUES
(1, 'Rajesh Patel', 'Head of Plant Operations', 'Apex Engineering Gujarat', 'NexGen Workforce Services has been instrumental in keeping our production running uninterrupted. Their technical electricians and warehouse helpers are punctual, skilled, and fully compliant with factory regulations.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 'active', 1),
(2, 'Sanjay Shah', 'Supply Chain Director', 'Metro Logistics Park, Bavla', 'We required over 80 warehouse staff on urgent notice for our festive surge. NexGen delivered verified personnel within 48 hours. Their on-site supervision and zero attrition make them our top staffing partner.', 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', 'active', 2),
(3, 'Pooja Mehta', 'VP Human Resources', 'Crown Corporate Towers', 'The housekeeping and facility support teams provided by NexGen maintain impeccable hygiene standards. Professional uniforms, trained demeanor, and proactive management by Nakul Chavada and his team.', 5, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', 'active', 3)
ON DUPLICATE KEY UPDATE `client_name`=VALUES(`client_name`), `feedback`=VALUES(`feedback`);

-- 7. SEO METADATA
INSERT INTO `seo_metadata` (`id`, `page_route`, `meta_title`, `meta_description`, `keywords`, `og_image`, `canonical_url`) VALUES
(1, '/', 'NEXGEN WORKFORCE SERVICES | Leading Manpower Supply in Gujarat', 'Premier workforce management, skilled manpower supply, housekeeping, warehouse staff, and technical technicians in Ahmedabad, Gujarat. Build People, Build Success.', 'manpower supply gujarat, staffing company ahmedabad, industrial manpower, skilled labor, housekeeping services bavla, driver services gujarat', '/logo/nexgen-logo.png', 'https://nexgenworkforce.com/'),
(2, '/about', 'About Us | NEXGEN WORKFORCE SERVICES - Build People, Build Success', 'Discover NexGen Workforce Services: our mission, values, industrial staffing expertise, and leadership commitment to empowering Indian businesses with skilled labor.', 'about nexgen workforce, workforce management company, manpower supplier ahmedabad, staffing partner gujarat', '/logo/nexgen-logo.png', 'https://nexgenworkforce.com/about'),
(3, '/services', 'Our Workforce Services | Manpower Supply & Staffing Solutions | NexGen', 'Explore our comprehensive workforce services: Housekeeping, Store & Warehouse Staff, Technical Manpower, and Driver Services across diverse industry sectors.', 'manpower services, warehouse staffing, housekeeping contractors, certified electricians, drivers supply', '/logo/nexgen-logo.png', 'https://nexgenworkforce.com/services'),
(4, '/industries', 'Industries We Serve | Manufacturing, Logistics & Infrastructure | NexGen', 'Tailored manpower and staffing solutions for manufacturing plants, construction sites, warehousing, IT hubs, and infrastructure projects across Gujarat.', 'manufacturing workforce, logistics staffing, construction manpower, corporate facility services', '/logo/nexgen-logo.png', 'https://nexgenworkforce.com/industries'),
(5, '/contact', 'Contact Us | NEXGEN WORKFORCE SERVICES - Bavla, Ahmedabad', 'Get in touch with NexGen Workforce Services. Call +91 9727930894 or visit our office at Ratna Sagar, Bavla, Ahmedabad, Gujarat for your workforce requirements.', 'contact nexgen workforce, manpower agency bavla, staffing office ahmedabad, nakul chavada nexgen', '/logo/nexgen-logo.png', 'https://nexgenworkforce.com/contact'),
(6, '/get-a-quote', 'Get a Workforce Quote | NEXGEN WORKFORCE SERVICES', 'Request a fast, customized staffing proposal for skilled, semi-skilled, or general manpower for your enterprise. Fast deployment and transparent rates.', 'hire manpower, request staffing quote, manpower agency quote gujarat', '/logo/nexgen-logo.png', 'https://nexgenworkforce.com/get-a-quote')
ON DUPLICATE KEY UPDATE `meta_title`=VALUES(`meta_title`), `meta_description`=VALUES(`meta_description`);

-- 8. NAVIGATION ITEMS
INSERT INTO `navigation_items` (`id`, `label`, `url`, `parent_id`, `display_order`, `is_cta`, `status`) VALUES
(1, 'Home', '/', NULL, 1, FALSE, 'active'),
(2, 'About Us', '/about', NULL, 2, FALSE, 'active'),
(3, 'Services', '/services', NULL, 3, FALSE, 'active'),
(4, 'Industries', '/industries', NULL, 4, FALSE, 'active'),
(5, 'Contact Us', '/contact', NULL, 5, FALSE, 'active'),
(6, 'Get a Quote', '/get-a-quote', NULL, 6, TRUE, 'active')
ON DUPLICATE KEY UPDATE `label`=VALUES(`label`), `url`=VALUES(`url`);

-- 9. SOCIAL LINKS
INSERT INTO `social_links` (`id`, `platform`, `url`, `icon_name`, `status`, `display_order`) VALUES
(1, 'whatsapp', 'https://wa.me/919727930894?text=Hello%20NexGen%20Workforce%20Services%2C%20I%20would%20like%20to%20inquire%20about%20manpower%20solutions.', 'MessageCircle', 'active', 1),
(2, 'linkedin', 'https://linkedin.com/company/nexgen-workforce-services', 'Linkedin', 'active', 2),
(3, 'facebook', 'https://facebook.com/nexgenworkforce', 'Facebook', 'active', 3),
(4, 'instagram', 'https://instagram.com/nexgenworkforce', 'Instagram', 'active', 4),
(5, 'twitter', 'https://twitter.com/nexgenworkforce', 'Twitter', 'active', 5)
ON DUPLICATE KEY UPDATE `url`=VALUES(`url`);

-- 10. SAMPLE INQUIRIES (For immediate dashboard demonstration)
INSERT INTO `inquiries` (`id`, `full_name`, `company_name`, `mobile_number`, `email_address`, `manpower_category`, `employees_required`, `location`, `message`, `status`, `internal_notes`) VALUES
(1, 'Vikram Desai', 'Adani Logistics Hub', '9898012345', 'vikram.desai@adanilogistics.com', 'Store & Warehouse Staff', 25, 'Sanand Industrial Estate, Ahmedabad', 'Urgent requirement for 25 verified storekeepers and packing personnel for the newly expanded fulfillment unit.', 'new', 'Requires follow-up call tomorrow morning.'),
(2, 'Dharmesh Solanki', 'Shree Ram Chemical Industries', '9723045678', 'dharmesh@shreeramchem.com', 'Technical Manpower', 8, 'GIDC Vatva, Ahmedabad', 'Need 5 certified electricians and 3 mechanical maintenance technicians for plant overhaul.', 'in_progress', 'Quote draft sent via email.'),
(3, 'Kavita Joshi', 'Apex Corporate Towers', '9825178901', 'kavita.joshi@apextowers.in', 'Housekeeping Services', 15, 'S.G. Highway, Ahmedabad', 'Seeking professional housekeeping and sanitation personnel for 12-floor commercial building.', 'contacted', 'Meeting scheduled with client manager.')
ON DUPLICATE KEY UPDATE `company_name`=VALUES(`company_name`);
