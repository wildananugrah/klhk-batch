import { Pool } from "pg";

import {
  dbConnectionTimeout,
  dbDatabase,
  dbIdleTimeout,
  dbMaxUses,
  dbPass,
  dbPoolMax,
  dbPoolMin,
  dbPort,
  dbUser,
  dbhost,
} from "../configs/db.config";
import { ODKDB } from "../dependencies/impl/odk.db";

const config = {
  host: dbhost,
  database: dbDatabase,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  ssl: false,
  min: dbPoolMin,
  max: dbPoolMax,
  idleTimeoutMillis: dbIdleTimeout,
  connectionTimeoutMillis: dbConnectionTimeout,
  maxUses: dbMaxUses,
};
const pool = new Pool(config);

beforeAll(async () => {
  console.log(`Connecting to ${dbhost}:${dbPort} databases...`);
  console.log(config);
});

afterAll(async () => {
  await pool.end();
});

describe("Generic Table normal", () => {
  const tblName: string = "public.submission_attachments s";
  jest.setTimeout(10000);
  it("generic table list", async () => {
    const odkdb = new ODKDB(pool);
    const dbResult = await odkdb.list();
    console.log(dbResult);
  });

});
