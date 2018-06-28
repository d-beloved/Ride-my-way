import db from './db';

const requests = (client) => {
  const queryString = `
  DROP TABLE IF EXISTS Requests;
  );

  DROP TYPE IF EXISTS status_allowed;
  CREATE TYPE status_allowed AS ENUM (
    'accepted',
    'pending',
    'rejected'
  );

  CREATE TABLE Ride_offers (
      requestId serial PRIMARY KEY,
      userId INTEGER REFERENCES Users(userid),
      rideId INTEGER REFERENCES Ride_offers(rideid)
      status status_allowed NOT NULL DEFAULT 'pending',
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

  client.query(queryString)
    .then(res => res)
    .catch(e => e.message);
};

requests(db);
