import db from './db';

const users = (client) => {
  const queryString = `
  DROP TABLE IF EXISTS Users CASCADE;
  );

  CREATE TABLE Users (
      userId serial PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      email varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

  client.query(queryString)
    .then(res => res)
    .catch(e => e.message);
};

users(db);
