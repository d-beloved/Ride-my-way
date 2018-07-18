import { Client } from 'pg';
import bcrypt from 'bcrypt';
import { connectionString } from '../config/config';

const hashedPassword = bcrypt.hashSync('ispassword', 10);

const sql = 'INSERT INTO aUsers (firstname, lastname, phoneno, username, email, password) VALUES($1,$2,$3,$4,$5,$6)';

const data1 = ['ayodeji', 'moronkeji', 70563224566, 'david', 'morayodeji@gmail.com', hashedPassword];

const data2 = ['gwen', 'gbenga', 90975434567, 'deji', 'davewritchie@gmail.com', hashedPassword];

const client = new Client(connectionString);
const client2 = new Client(connectionString);

client.connect();
client2.connect();
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
