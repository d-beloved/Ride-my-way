import db from './db';

const rideOffers = (client) => {
  const queryString = `
  DROP TABLE IF EXISTS Ride_offers CASCADE;
  );

  CREATE TABLE Ride_offers (
      rideId serial PRIMARY KEY,
      userId INTEGER REFERENCES Users(userid),
      message TEXT NOT NULL,
      destination VARCHAR(255) NOT NULL,
      depart VARCHAR(255) NOT NULL,
      time TIME NOT NULL,
      date DATE NOT NULL,
      cost MONEY NOT NULL,
      seats SMALLINT NOT NULL
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

  client.query(queryString)
    .then(res => res)
    .catch(e => e.message);
};

rideOffers(db);
