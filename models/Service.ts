import { query, queryOne, execute } from '@/lib/db';
import { getSafeJson } from '@/lib/utils';

export interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  subtitle?: string | null;
  short_description: string;
  full_description?: string | null;
  icon_name: string;
  image_url?: string | null;
  banner_url?: string | null;
  key_responsibilities?: string[] | null;
  benefits?: string[] | null;
  industry_applications?: string[] | null;
  status: 'active' | 'inactive';
  display_order: number;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at: Date;
  updated_at: Date;
}

function parseServiceRow(row: any): ServiceItem {
  return {
    ...row,
    key_responsibilities: getSafeJson(row.key_responsibilities, []),
    benefits: getSafeJson(row.benefits, []),
    industry_applications: getSafeJson(row.industry_applications, []),
  };
}

export class ServiceModel {
  static async getAllActive(): Promise<ServiceItem[]> {
    const rows = await query<any>(
      'SELECT * FROM services WHERE status = "active" ORDER BY display_order ASC, id ASC;'
    );
    return rows.map(parseServiceRow);
  }

  static async getAllAdmin(): Promise<ServiceItem[]> {
    const rows = await query<any>(
      'SELECT * FROM services ORDER BY display_order ASC, id ASC;'
    );
    return rows.map(parseServiceRow);
  }

  static async findBySlug(slug: string): Promise<ServiceItem | null> {
    const row = await queryOne<any>(
      'SELECT * FROM services WHERE slug = ? LIMIT 1;',
      [slug]
    );
    return row ? parseServiceRow(row) : null;
  }

  static async findById(id: number): Promise<ServiceItem | null> {
    const row = await queryOne<any>(
      'SELECT * FROM services WHERE id = ? LIMIT 1;',
      [id]
    );
    return row ? parseServiceRow(row) : null;
  }

  static async create(data: Partial<ServiceItem>): Promise<number> {
    const result = await execute(
      `INSERT INTO services 
      (slug, title, subtitle, short_description, full_description, icon_name, image_url, banner_url, key_responsibilities, benefits, industry_applications, status, display_order, meta_title, meta_description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        data.slug,
        data.title,
        data.subtitle || null,
        data.short_description,
        data.full_description || null,
        data.icon_name || 'Briefcase',
        data.image_url || null,
        data.banner_url || null,
        JSON.stringify(data.key_responsibilities || []),
        JSON.stringify(data.benefits || []),
        JSON.stringify(data.industry_applications || []),
        data.status || 'active',
        data.display_order || 0,
        data.meta_title || null,
        data.meta_description || null,
      ]
    );
    return result.insertId;
  }

  static async update(id: number, data: Partial<ServiceItem>): Promise<void> {
    await execute(
      `UPDATE services SET 
        slug = ?, title = ?, subtitle = ?, short_description = ?, full_description = ?, 
        icon_name = ?, image_url = ?, banner_url = ?, 
        key_responsibilities = ?, benefits = ?, industry_applications = ?, 
        status = ?, display_order = ?, meta_title = ?, meta_description = ?
      WHERE id = ?;`,
      [
        data.slug,
        data.title,
        data.subtitle || null,
        data.short_description,
        data.full_description || null,
        data.icon_name || 'Briefcase',
        data.image_url || null,
        data.banner_url || null,
        JSON.stringify(data.key_responsibilities || []),
        JSON.stringify(data.benefits || []),
        JSON.stringify(data.industry_applications || []),
        data.status || 'active',
        data.display_order || 0,
        data.meta_title || null,
        data.meta_description || null,
        id,
      ]
    );
  }

  static async delete(id: number): Promise<void> {
    await execute('DELETE FROM services WHERE id = ?;', [id]);
  }
}
