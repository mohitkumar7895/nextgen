import { query, queryOne, execute } from '@/lib/db';

export interface BlogItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  image_url: string;
  is_featured: boolean | number;
  status: 'published' | 'draft';
  meta_title?: string | null;
  meta_description?: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

export class BlogModel {
  static async getAll(options?: {
    status?: string;
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ blogs: BlogItem[]; total: number }> {
    const conditions: string[] = [];
    const params: any[] = [];

    if (options?.status && options.status !== 'all') {
      conditions.push('status = ?');
      params.push(options.status);
    }

    if (options?.category && options.category !== 'all') {
      conditions.push('category = ?');
      params.push(options.category);
    }

    if (options?.search) {
      conditions.push('(title LIKE ? OR excerpt LIKE ? OR category LIKE ?)');
      const term = `%${options.search}%`;
      params.push(term, term, term);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countRows = await query<any>(`SELECT COUNT(*) as cnt FROM blogs ${whereClause};`, params);
    const total = countRows[0]?.cnt || 0;

    const limit = options?.limit || 50;
    const offset = options?.offset || 0;

    const sql = `SELECT * FROM blogs ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?;`;
    const blogs = await query<BlogItem>(sql, [...params, limit, offset]);

    return { blogs, total };
  }

  static async getAllPublished(): Promise<BlogItem[]> {
    return query<BlogItem>(
      `SELECT * FROM blogs WHERE status = 'published' ORDER BY is_featured DESC, created_at DESC;`
    );
  }

  static async findBySlug(slug: string): Promise<BlogItem | null> {
    return queryOne<BlogItem>(`SELECT * FROM blogs WHERE slug = ?;`, [slug]);
  }

  static async findById(id: number): Promise<BlogItem | null> {
    return queryOne<BlogItem>(`SELECT * FROM blogs WHERE id = ?;`, [id]);
  }

  static async create(data: Partial<BlogItem>): Promise<number> {
    const slug =
      data.slug ||
      (data.title || 'article')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const result = await execute(
      `INSERT INTO blogs (slug, title, excerpt, content, category, author, read_time, image_url, is_featured, status, meta_title, meta_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        slug,
        data.title,
        data.excerpt || '',
        data.content || '',
        data.category || 'Workforce Management',
        data.author || 'Nakul Chavada',
        data.read_time || '4 min read',
        data.image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        data.is_featured ? 1 : 0,
        data.status || 'published',
        data.meta_title || null,
        data.meta_description || null,
      ]
    );

    return result.insertId;
  }

  static async update(id: number, data: Partial<BlogItem>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    const allowedKeys: (keyof BlogItem)[] = [
      'slug',
      'title',
      'excerpt',
      'content',
      'category',
      'author',
      'read_time',
      'image_url',
      'is_featured',
      'status',
      'meta_title',
      'meta_description',
    ];

    for (const key of allowedKeys) {
      if (data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(key === 'is_featured' ? (data[key] ? 1 : 0) : data[key]);
      }
    }

    if (fields.length === 0) return;

    values.push(id);
    await execute(`UPDATE blogs SET ${fields.join(', ')} WHERE id = ?;`, values);
  }

  static async delete(id: number): Promise<void> {
    await execute(`DELETE FROM blogs WHERE id = ?;`, [id]);
  }
}
