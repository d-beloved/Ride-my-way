const userModel = `
  DROP TABLE IF EXISTS aUsers CASCADE;
  CREATE TABLE aUsers (
      userId serial PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      phoneno BIGINT NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

const userdb = `${userModel}`;

export default userdb;
