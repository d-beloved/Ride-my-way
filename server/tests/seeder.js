import { Client } from 'pg';
import bcrypt from 'bcrypt';
import { connectionString } from '../config/config';

const hashedPassword = bcrypt.hashSync('ispassword', 10);

const seedUserData1 = {
  text: 'INSERT INTO Users (username, email, password) VALUES($1,$2,$3)',
  values: ['David', 'morayodeji@gmail.com', hashedPassword]
};
const seedUserData2 = {
  text: 'INSERT INTO Users (username, email, password) VALUES($1,$2,$3)',
  values: ['Deji', 'davewritchie@gmail.com', hashedPassword]
};
const seedRideOffer1 = `INSERT INTO Ride_offer (userId, message, destination, depart, date) VALUES
(1, 'Let us excape to the Bahamas', 'Bahamas', 'Lagos', '2018-07-27');`;
const seedRideOffer2 = `INSERT INTO Ride_offer (userId, message, destination, depart, date) VALUES
(2, 'Abuja is Hot, Lagos is hotter', 'Lagos', 'Abuja', '2018-09-02');`;
const seedRequest1 = `INSERT INTO Requests (userId, rideId, status) VALUES
(1, 2, pending);`;
const seedRequest2 = `INSERT INTO Requests (userId, rideId, status) VALUES
(2, 1, pending);`;

const query = `${seedUserData1}${seedUserData2}${seedRideOffer1}${seedRideOffer2}${seedRequest1}${seedRequest2}`;

const client = new Client(connectionString);
client.connect();
client.query(seedUserData1)
  .then(() => {
    client.end();
    const client1 = new Client(connectionString);
    client1.connect();
    client1.query(query)
      .then(() => client1.end())
      .catch(() => client1.end());
  })
  .catch(() => client.end());
