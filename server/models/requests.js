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
      userId INT NOT NULL,
      rideId INT NOT NULL,
      status status_allowed NOT NULL DEFAULT 'pending',
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      foreign key(userId) REFERENCES aUsers(userId),
      foreign key(rideId) REFERENCES bRide_offers(rideId)
  );
`;

const requestDb = `${requestModel}`;

export default requestDb;
