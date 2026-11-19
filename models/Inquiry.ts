import { query, queryOne, execute } from '@/lib/db';

export interface InquiryItem {
  id: number;
  full_name: string;
  company_name: string;
  mobile_number: string;
  email_address: string;
  manpower_category: string;
  employees_required: number;
  location: string;
  message?: string | null;
  status: 'new' | 'in_progress' | 'contacted' | 'converted' | 'rejected';
  internal_notes?: string | null;
  created_at: Date;
  updated_at: Date;
}

export class InquiryModel {
  static async create(data: {
    full_name: string;
    company_name: string;
    mobile_number: string;
    email_address: string;
    manpower_category: string;
    employees_required: number;
    location: string;
    message?: string;
  }): Promise<number> {
    const result = await execute(
      `INSERT INTO inquiries 
      (full_name, company_name, mobile_number, email_address, manpower_category, employees_required, location, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new');`,
      [
        data.full_name,
        data.company_name,
        data.mobile_number,
        data.email_address,
        data.manpower_category,
        data.employees_required || 1,
        data.location,
        data.message || null,
      ]
    );
    return result.insertId;
  }

  static async getAll(options?: {
    status?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ inquiries: InquiryItem[]; total: number }> {
    const conditions: string[] = [];
    const params: any[] = [];

    if (options?.status && options.status !== 'all') {
      conditions.push('status = ?');
      params.push(options.status);
    }

    if (options?.search) {
      conditions.push('(full_name LIKE ? OR company_name LIKE ? OR mobile_number LIKE ? OR email_address LIKE ? OR manpower_category LIKE ?)');
      const term = `%${options.search}%`;
      params.push(term, term, term, term, term);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countRows = await query<any>(`SELECT COUNT(*) as cnt FROM inquiries ${whereClause};`, params);
    const total = countRows[0]?.cnt || 0;

    let sql = `SELECT * FROM inquiries ${whereClause} ORDER BY created_at DESC`;
    if (options?.limit) {
      sql += ` LIMIT ${parseInt(String(options.limit), 10)}`;
      if (options?.offset) {
        sql += ` OFFSET ${parseInt(String(options.offset), 10)}`;
      }
    }

    const inquiries = await query<InquiryItem>(sql, params);
    return { inquiries, total };
  }

  static async findById(id: number): Promise<InquiryItem | null> {
    return queryOne<InquiryItem>('SELECT * FROM inquiries WHERE id = ? LIMIT 1;', [id]);
  }

  static async updateStatus(id: number, status: string, internalNotes?: string): Promise<void> {
    if (internalNotes !== undefined) {
      await execute('UPDATE inquiries SET status = ?, internal_notes = ? WHERE id = ?;', [status, internalNotes, id]);
    } else {
      await execute('UPDATE inquiries SET status = ? WHERE id = ?;', [status, id]);
    }
  }

  static async updateNotes(id: number, internalNotes: string): Promise<void> {
    await execute('UPDATE inquiries SET internal_notes = ? WHERE id = ?;', [internalNotes, id]);
  }

  static async delete(id: number): Promise<void> {
    await execute('DELETE FROM inquiries WHERE id = ?;', [id]);
  }

  static async getDashboardMetrics(): Promise<{
    total: number;
    newCount: number;
    inProgress: number;
    contacted: number;
    converted: number;
    monthlyStats: { month: string; count: number }[];
    categoryStats: { category: string; count: number }[];
  }> {
    const totalRow = await queryOne<any>('SELECT COUNT(*) as total FROM inquiries;');
    const statusRows = await query<any>(
      'SELECT status, COUNT(*) as count FROM inquiries GROUP BY status;'
    );

    let newCount = 0;
    let inProgress = 0;
    let contacted = 0;
    let converted = 0;

    for (const r of statusRows) {
      if (r.status === 'new') newCount = r.count;
      else if (r.status === 'in_progress') inProgress = r.count;
      else if (r.status === 'contacted') contacted = r.count;
      else if (r.status === 'converted') converted = r.count;
    }

    const monthlyRows = await query<any>(`
      SELECT DATE_FORMAT(created_at, '%b %Y') as month, COUNT(*) as count 
      FROM inquiries 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%b %Y'), YEAR(created_at), MONTH(created_at)
      ORDER BY YEAR(created_at) ASC, MONTH(created_at) ASC;
    `);

    const categoryRows = await query<any>(`
      SELECT manpower_category as category, COUNT(*) as count 
      FROM inquiries 
      GROUP BY manpower_category 
      ORDER BY count DESC 
      LIMIT 6;
    `);

    return {
      total: totalRow?.total || 0,
      newCount,
      inProgress,
      contacted,
      converted,
      monthlyStats: monthlyRows.map((r: any) => ({ month: r.month, count: Number(r.count) })),
      categoryStats: categoryRows.map((r: any) => ({ category: r.category, count: Number(r.count) })),
    };
  }

  static async exportToCSV(): Promise<string> {
    const rows = await query<InquiryItem>('SELECT * FROM inquiries ORDER BY created_at DESC;');
    
    const headers = [
      'ID',
      'Full Name',
      'Company Name',
      'Mobile Number',
      'Email Address',
      'Category',
      'Employees Required',
      'Location',
      'Status',
      'Message',
      'Internal Notes',
      'Created At',
    ];

    const csvLines = [headers.join(',')];

    for (const r of rows) {
      const line = [
        r.id,
        `"${(r.full_name || '').replace(/"/g, '""')}"`,
        `"${(r.company_name || '').replace(/"/g, '""')}"`,
        `"${(r.mobile_number || '').replace(/"/g, '""')}"`,
        `"${(r.email_address || '').replace(/"/g, '""')}"`,
        `"${(r.manpower_category || '').replace(/"/g, '""')}"`,
        r.employees_required || 1,
        `"${(r.location || '').replace(/"/g, '""')}"`,
        `"${r.status}"`,
        `"${(r.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${(r.internal_notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${new Date(r.created_at).toISOString()}"`,
      ];
      csvLines.push(line.join(','));
    }

    return csvLines.join('\n');
  }
}
