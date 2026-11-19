import { query, queryOne, execute } from '@/lib/db';

export interface SeoMetadataItem {
  id: number;
  page_route: string;
  meta_title: string;
  meta_description: string;
  keywords?: string | null;
  og_image?: string | null;
  canonical_url?: string | null;
  updated_at: Date;
}

export class SeoModel {
  static async getByRoute(route: string): Promise<SeoMetadataItem | null> {
    return queryOne<SeoMetadataItem>(
      'SELECT * FROM seo_metadata WHERE page_route = ? LIMIT 1;',
      [route]
    );
  }

  static async getAll(): Promise<SeoMetadataItem[]> {
    return query<SeoMetadataItem>('SELECT * FROM seo_metadata ORDER BY page_route ASC;');
  }

  static async save(data: Partial<SeoMetadataItem>): Promise<void> {
    await execute(
      `INSERT INTO seo_metadata (page_route, meta_title, meta_description, keywords, og_image, canonical_url)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
        meta_title = VALUES(meta_title),
        meta_description = VALUES(meta_description),
        keywords = VALUES(keywords),
        og_image = VALUES(og_image),
        canonical_url = VALUES(canonical_url);`,
      [
        data.page_route,
        data.meta_title,
        data.meta_description,
        data.keywords || null,
        data.og_image || null,
        data.canonical_url || null,
      ]
    );
  }
}
