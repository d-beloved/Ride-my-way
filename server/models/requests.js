import { Pool } from 'pg';

const request = new Pool({
  username: 'D_BELOVED',
  password: null,
  database: 'ride-my-way-dev',
  host: '127.0.0.1',
  port: 5432,
});

const queryString = `
  DROP TABLE IF EXISTS Requests;

  DROP TYPE IF EXISTS status_allowed;
  CREATE TYPE status_allowed AS ENUM (
    'accepted',
    'pending',
    'rejected'
  );

  CREATE TABLE Requests (
      requestId serial PRIMARY KEY,
      userId INTEGER REFERENCES Users(userid),
      rideId INTEGER REFERENCES Ride_offers(rideid),
      status status_allowed NOT NULL DEFAULT 'pending',
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

request.query(queryString)
  .then(res => res)
  .catch(e => e.message);
