import { Pool } from 'pg';

const user = new Pool({
  username: 'D_BELOVED',
  password: null,
  database: 'ride-my-way-dev',
  host: '127.0.0.1',
  port: 5432,
});

const queryString = `
  DROP TABLE IF EXISTS Users CASCADE;

  CREATE TABLE Users (
      userId serial PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

user.query(queryString)
  .then(res => res)
  .catch(e => e.message);
