import { Client } from 'pg';
import { connectionString } from '../config/config';

const sql = 'INSERT INTO bRide_offers (message, destination, driverDetails, departurelocation, date, userId) VALUES($1,$2,$3,$4,$5,$6)';

const data = ['Let\'s take a trip to the Bahamas', 'Bahamas', 'ayodeji moronkeji', 'Lagos', '2018-07-27', '1'];

const client = new Client(connectionString);
client.connect();

client.query(sql, data, (err) => {
  if (err) {
    client.end();
  } else {
    client.end();
    console.log('Ride offer inserted');
  }
});
