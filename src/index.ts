import { ODKDB } from "./dependencies/impl/odk.db";
import { Converter } from "./logics/converter";

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
  } from "./configs/db.config";
import { Pool } from "pg";
import { ImageConverter } from "./dependencies/impl/image.converter";
  
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
const odkdb = new ODKDB(pool);
const imageConverter = new ImageConverter();
const converter = new Converter({ odkdb: odkdb, imageConverter: imageConverter });
converter.run();

