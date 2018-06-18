import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './server/routes';


// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests to the console.
app.use(logger('dev'));

// set router for api endpoints
app.use('/', router);

// set the port for the server
const port = process.env.PORT || 3110;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Ride-my-way App Listening, let's go to localhost:${port}!`);
});

// This will be our application entry. Our server is setup here.

export default app;
