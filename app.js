import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './server/routes/routes';


// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests to the console.
app.use(logger('dev'));

// set router for api endpoints
app.use('/api/v1', routes);

// set the port for the server
const port = process.env.PORT || 3110;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Ride-my-way App is Listening on port ${port}!`);
});

// This will be our application entry. Our server is setup here.

export default app;
