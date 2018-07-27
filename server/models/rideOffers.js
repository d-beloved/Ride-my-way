const rideModel = `
  DROP TABLE IF EXISTS bRide_offers CASCADE;
  CREATE TABLE bRide_offers (
      rideId serial PRIMARY KEY,
      userId INT NOT NULL,
      message TEXT NOT NULL,
      destination VARCHAR(255) NOT NULL,
      driverDetails VARCHAR(255) NOT NULL,
      departurelocation VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      foreign key(userId) REFERENCES aUsers(userId)
  );
`;

const rideDb = `${rideModel}`;

export default rideDb;
