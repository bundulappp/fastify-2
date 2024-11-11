import { Pool } from 'pg';
import 'dotenv/config';
export type DbClient = {
  query: <RowType>(
    query: string,
    params?: any[]
  ) => Promise<RowType[] | RowType>;
};
type PgClientOptions = {
  connectionString: string;
};
export function createPgClient({
  connectionString,
}: PgClientOptions): DbClient {
  const pool = new Pool({ connectionString });
  return {
    async query(sql: string, params?: any[]) {
      const result = await pool.query(sql, params);
      return result.rows;
    },
  };
}
