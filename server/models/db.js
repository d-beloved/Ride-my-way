import { Client } from 'pg';
import { connectionString } from '../config/config';
import userDb from './users';
import rideDb from './rideOffers';
import requestDb from './requests';

const makeQuery = (query) => {
  const client = new Client(connectionString);
  client.connect();
  client.query(query)
    .then(() => client.end())
    .catch(() => client.end());
};
makeQuery(`${userDb}${rideDb}${requestDb}`);

