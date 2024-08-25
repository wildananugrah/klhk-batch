import { Pool } from "pg";
import { DatabaseException } from "../../exceptions/database.exception";
import { IODKDB } from "../iodk.db";

export class ODKDB implements IODKDB {
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  queryGet = `select id, name, content, "contentType" from tbl_mst_submission_tmp where status = 'UN-CONVERTED' order by created_at desc limit $1`;
  queryUpdate = `update tbl_mst_submission_tmp set status='CONVERTED' where id=$1`;
  async list(limit: number): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.queryGet, [limit]);
      return dbResult.rows;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }

  async update(id: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await client.query(this.queryUpdate, [id]);
      return true;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
}
