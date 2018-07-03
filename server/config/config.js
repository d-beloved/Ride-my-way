import dotenv from 'dotenv';

dotenv.config();
export const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.LOCAL_DB_DATABASE,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_LOCAL_TEST,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
  },
};
let setConnectionString;
const env = process.env.NODE_ENV || 'development';
if (env === 'production') setConnectionString = { connectionString: process.env.DATABASE_URL, ssl: true };
else setConnectionString = config[env];
export const connectionString = setConnectionString;
