import { query, queryOne, execute } from '@/lib/db';
import { getSafeJson } from '@/lib/utils';

export interface SiteSettingRow {
  id: number;
  setting_key: string;
  setting_value: string;
  setting_group: string;
  description?: string | null;
  updated_at: Date;
}

export interface IndustryItem {
  id: number;
  slug: string;
  name: string;
  description: string;
  icon_name: string;
  image_url: string;
  workforce_types?: string[] | null;
  status: 'active' | 'inactive';
  display_order: number;
}

export interface StatisticItem {
  id: number;
  stat_key: string;
  label: string;
  value: string;
  numeric_value: number;
  suffix: string;
  icon_name: string;
  display_order: number;
}

export interface TestimonialItem {
  id: number;
  client_name: string;
  client_designation?: string | null;
  company_name?: string | null;
  feedback: string;
  rating: number;
  avatar_url?: string | null;
  status: 'active' | 'inactive';
  display_order: number;
}

export class SettingsModel {
  /**
   * Get all site settings as a key-value dictionary
   */
  static async getAllSettings(): Promise<Record<string, string>> {
    const rows = await query<SiteSettingRow>('SELECT setting_key, setting_value FROM site_settings;');
    const map: Record<string, string> = {};
    for (const r of rows) {
      map[r.setting_key] = r.setting_value || '';
    }
    return map;
  }

  /**
   * Update multiple settings in one transaction/loop
   */
  static async updateSettings(settings: Record<string, string>): Promise<void> {
    for (const [key, val] of Object.entries(settings)) {
      await execute(
        `INSERT INTO site_settings (setting_key, setting_value) 
         VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);`,
        [key, val]
      );
    }
  }

  /**
   * Get all active statistics
   */
  static async getStatistics(): Promise<StatisticItem[]> {
    return query<StatisticItem>('SELECT * FROM statistics ORDER BY display_order ASC, id ASC;');
  }

  /**
   * Update a statistic
   */
  static async updateStatistic(id: number, data: Partial<StatisticItem>): Promise<void> {
    await execute(
      'UPDATE statistics SET label = ?, value = ?, numeric_value = ?, suffix = ? WHERE id = ?;',
      [data.label, data.value, data.numeric_value || 0, data.suffix || '+', id]
    );
  }

  /**
   * Get all active industries
   */
  static async getIndustries(activeOnly = true): Promise<IndustryItem[]> {
    const sql = activeOnly
      ? 'SELECT * FROM industries WHERE status = "active" ORDER BY display_order ASC, id ASC;'
      : 'SELECT * FROM industries ORDER BY display_order ASC, id ASC;';
    const rows = await query<any>(sql);
    return rows.map((r: any) => ({
      ...r,
      workforce_types: getSafeJson(r.workforce_types, []),
    }));
  }

  /**
   * Get all testimonials
   */
  static async getTestimonials(activeOnly = true): Promise<TestimonialItem[]> {
    const sql = activeOnly
      ? 'SELECT * FROM testimonials WHERE status = "active" ORDER BY display_order ASC, id ASC;'
      : 'SELECT * FROM testimonials ORDER BY display_order ASC, id ASC;';
    return query<TestimonialItem>(sql);
  }

  /**
   * Update or create industry
   */
  static async saveIndustry(data: Partial<IndustryItem>): Promise<number> {
    if (data.id) {
      await execute(
        `UPDATE industries SET 
          slug = ?, name = ?, description = ?, icon_name = ?, image_url = ?, 
          workforce_types = ?, status = ?, display_order = ? 
        WHERE id = ?;`,
        [
          data.slug,
          data.name,
          data.description,
          data.icon_name || 'Building2',
          data.image_url || null,
          JSON.stringify(data.workforce_types || []),
          data.status || 'active',
          data.display_order || 0,
          data.id,
        ]
      );
      return data.id;
    } else {
      const res = await execute(
        `INSERT INTO industries (slug, name, description, icon_name, image_url, workforce_types, status, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          data.slug,
          data.name,
          data.description,
          data.icon_name || 'Building2',
          data.image_url || null,
          JSON.stringify(data.workforce_types || []),
          data.status || 'active',
          data.display_order || 0,
        ]
      );
      return res.insertId;
    }
  }

  static async deleteIndustry(id: number): Promise<void> {
    await execute('DELETE FROM industries WHERE id = ?;', [id]);
  }
}
