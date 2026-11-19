import { query, queryOne, execute } from '@/lib/db';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  last_login?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export class AdminModel {
  static async findByEmail(email: string): Promise<AdminUser | null> {
    return queryOne<AdminUser>(
      'SELECT id, name, email, password_hash, role, last_login, created_at, updated_at FROM admins WHERE email = ? LIMIT 1;',
      [email.toLowerCase().trim()]
    );
  }

  static async findById(id: number): Promise<AdminUser | null> {
    return queryOne<AdminUser>(
      'SELECT id, name, email, password_hash, role, last_login, created_at, updated_at FROM admins WHERE id = ? LIMIT 1;',
      [id]
    );
  }

  static async updateLastLogin(id: number): Promise<void> {
    await execute('UPDATE admins SET last_login = NOW() WHERE id = ?;', [id]);
  }

  static async updateProfile(id: number, name: string, email: string): Promise<void> {
    await execute('UPDATE admins SET name = ?, email = ? WHERE id = ?;', [name, email, id]);
  }

  static async updatePassword(id: number, passwordHash: string): Promise<void> {
    await execute('UPDATE admins SET password_hash = ? WHERE id = ?;', [passwordHash, id]);
  }
}
