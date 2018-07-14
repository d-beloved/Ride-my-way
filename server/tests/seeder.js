import { Client } from 'pg';
import bcrypt from 'bcrypt';
import { connectionString } from '../config/config';

const hashedPassword = bcrypt.hashSync('ispassword', 10);

const sql = 'INSERT INTO Users (firstname, lastname, phoneno, username, email, password) VALUES($1,$2,$3,$4,$5,$6)';

const sql2 = 'INSERT INTO Ride_offers (userId, message, destination, departurelocation, date) VALUES($1,$2,$3,$4,$5)';

const data1 = ['ayodeji', 'moronkeji', 70563224566, 'david', 'morayodeji@gmail.com', hashedPassword];

const data2 = ['gwen', 'gbenga', 90975434567, 'deji', 'davewritchie@gmail.com', hashedPassword];

const data3 = [1, 'Let\'s take a trip to the Bahamas', 'Bahamas', 'Lagos', '2018-07-27'];

const client = new Client(connectionString);
const client2 = new Client(connectionString);
const client3 = new Client(connectionString);

client.connect();
client2.connect();
client3.connect();
client.query(sql, data1, (err) => {
  if (err) {
    client.end();
    console.log(err.stack);
  } else {
    client.end();
    console.log('user inserted');
  }
});

client2.query(sql, data2, (err) => {
  if (err) {
    client2.end();
    console.log(err.stack);
  } else {
    client2.end();
    console.log('user inserted');
  }
});

client3.query(sql2, data3, (err) => {
  if (err) {
    client3.end();
    console.log(err.stack);
  } else {
    client3.end();
    console.log('Ride offer inserted');
  }
});