import { Client } from 'pg';
import bcrypt from 'bcrypt';
import { connectionString } from '../config/config';

const hashedPassword = bcrypt.hashSync('ispassword', 10);

const seedUserData = {
  text: 'INSERT INTO users (firstname, lastname, email, password, role) VALUES($1, $2,$3,$4,$5)',
  values: ['Sinmi', 'John', 'sinmiloluwasunday@yahoo.com', hashedPassword, 'admin']
};
const seedRequestData1 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Damaged Chair', 'we have a fault', 'electrical', '', 'approved', '2018-12-13', 1);`;
const seedRequestData2 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Faulty AC', 'we have a fault', 'electrical', '', 'approved', '2018-12-13', 1);`;
const seedRequestData3 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Machine Fault', 'we have a fault', 'electrical', '', 'disapproved', '2018-12-13', 1);`;
const seedRequestData4 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Electronic Fault', 'we have a fault', 'electrical', '', 'disapproved', '2018-12-13', 1);`;
const seedRequestData5 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Damaged door', 'we have a fault', 'electrical', '', 'resolved', '2018-12-13', 1);`;
const seedRequestData6 = `INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES
('Broken Window', 'we have a fault', 'electrical', '', 'resolved', '2018-12-13', 1);`;

const query = `${seedRequestData1}${seedRequestData2}${seedRequestData3}${seedRequestData4}${seedRequestData5}${seedRequestData6}`;

const client = new Client(connectionString);
client.connect();
client.query(seedUserData)
  .then(() => {
    client.end();
    const client1 = new Client(connectionString);
    client1.connect();
    client1.query(query)
      .then(() => client1.end())
      .catch(() => client1.end());
  })
  .catch(() => client.end());
