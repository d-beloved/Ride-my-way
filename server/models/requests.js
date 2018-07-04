const requestModel = `
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
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(userId,rideId)
  );
`;

const requestDb = `${requestModel}`;

export default requestDb;
