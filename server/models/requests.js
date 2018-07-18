const requestModel = `
  DROP TABLE IF EXISTS cRequests;
  DROP TYPE IF EXISTS status_allowed;
  CREATE TYPE status_allowed AS ENUM (
    'accepted',
    'pending',
    'rejected'
  );

  CREATE TABLE cRequests (
      requestId serial PRIMARY KEY,
      userId INTEGER REFERENCES aUsers(userid),
      rideId INTEGER REFERENCES bRide_offers(rideid),
      status status_allowed NOT NULL DEFAULT 'pending',
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

const requestDb = `${requestModel}`;

export default requestDb;
