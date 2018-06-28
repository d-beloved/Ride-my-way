/* eslint-disable import/no-mutable-exports */
import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const envVariables = config[env];

const connectionString = process.env.DATABASE_URL;

dotenv.config();

let db;
if (process.env.NODE_ENV === 'production') {
  db = new Pool({ connectionString });
} else {
  db = new Pool({
    database: envVariables.database,
    user: envVariables.username,
    password: envVariables.password,
    envVariables,
  });
}

export default db;
