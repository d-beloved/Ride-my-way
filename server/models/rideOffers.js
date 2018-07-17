const rideModel = `
  DROP TABLE IF EXISTS Ride_offers CASCADE;
  CREATE TABLE Ride_offers (
      rideId serial PRIMARY KEY,
      userId INTEGER REFERENCES Users(userid),
      message TEXT NOT NULL,
      destination VARCHAR(255) NOT NULL,
      departurelocation VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

const rideDb = `${rideModel}`;

export default rideDb;
