/* eslint-disable import/no-mutable-exports */
import dotenv from 'dotenv';
import { Pool } from 'pg';
import config from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const envVariables = config[env];

const connectionString = process.env.DATABASE_URL;

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
