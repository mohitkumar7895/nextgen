import mysql from 'mysql2/promise';

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

const poolConfig: mysql.PoolOptions = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nextgen',
  waitForConnections: true,
  connectionLimit: 15,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  charset: 'utf8mb4',
};

// Global pool to prevent connection exhaustion during Next.js hot reloads in development
export const db = global._mysqlPool || mysql.createPool(poolConfig);

if (process.env.NODE_ENV !== 'production') {
  global._mysqlPool = db;
}

/**
 * Execute a parameterized SQL query
 */
export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  try {
    const [rows] = await db.query(sql, params);
    return rows as T[];
  } catch (error: any) {
    console.error('MySQL Query Error:', { sql, params, message: error.message });
    throw error;
  }
}

/**
 * Execute a query expecting a single row result
 */
export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Execute an INSERT / UPDATE / DELETE statement returning affectedRows and insertId
 */
export async function execute(sql: string, params: any[] = []): Promise<mysql.ResultSetHeader> {
  try {
    const [result] = await db.execute(sql, params);
    return result as mysql.ResultSetHeader;
  } catch (error: any) {
    console.error('MySQL Execute Error:', { sql, params, message: error.message });
    throw error;
  }
}

export default db;
