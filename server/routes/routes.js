import express from 'express';
import auth from '../helpers/auth';
import validateRequest from '../helpers/validation';
import userController from '../controllers/user';
import rideOfferController from '../controllers/rideOffer';
import requestRideController from '../controllers/requests';
import searchFilter from '../helpers/searchFilter';

// using router routes
const router = express.Router();

/** ****************** MY API ENDPOINTS *************** */

// Welcome message route
router.get('/', (req, res) => {
  const rootMessage = {
    message: 'Welcome to Ride-My-Way app! Your one stop place to get rides to your desired destination at reasonable prices',
    endpoints: {
      createRideOffer: 'POST /api/v1/rides',
      getAllRideOffer: 'GET /api/v1/rides',
      getOneRideOffer: 'GET /api/v1/rides/:rideId',
      searchRideByDestination: 'GET /api/v1/rides?destination=<destination>',
      editRideOffer: 'PUT /api/v1/rides/:rideId',
      deleteRideOffer: 'DELETE /api/v1/rides/:rideId',
      makeRequestForRide: 'POST /api/v1/rides/:rideId/requests',
      getAllRequestsForRide: 'GET /api/v1/rides/:rideId/requests',
      checkRequestStatus: 'GET /api/v1/rides/:rideId/requests/:requestId/status'
    }
  };
  res.status(200).json(rootMessage);
});


// signs up a user
router.post(
  '/auth/signup',
  validateRequest.removeWhiteSpaces,
  validateRequest.checkBodyContains('username', 'email', 'password'),
  userController.createUser
);

// logs in a user
router.post(
  '/auth/login',
  validateRequest.removeWhiteSpaces,
  validateRequest.checkBodyContains('email', 'password'),
  userController.loginUser
);


// Create a ride offer
router.post(
  '/users/rides',
  auth.authenticate,
  validateRequest.removeWhiteSpaces,
  validateRequest.checkBodyContains('message', 'destination', 'depart', 'time', 'date', 'seats'),
  // validateRequest.confirmDate,
  // validateRequest.confirmFeeType,
  // validateRequest.rideOfferExists,
  rideOfferController.createRideOffer
);

// Get all ride offers
router.get('/rides', searchFilter.byDestination, rideOfferController.getAllRideOffer);

// Get one ride offer
router.get('/rides/:rideId', rideOfferController.getOneRideOffer);

// Deletes a ride offer
router.delete('/rides/:rideId', rideOfferController.deleteRideOffer);

// Edits a ride offer
router.put('/rides/:rideId', validateRequest.removeWhiteSpaces, rideOfferController.modifyRideOffer);

// Requests for a ride offer
router.post(
  '/rides/:rideId/requests',
  validateRequest.removeWhiteSpaces,
  validateRequest.checkBodyContains('requester'),
  requestRideController.makeRequestForRide
);

// Get all the requests for a ride offer
router.get('/rides/:rideId/requests', requestRideController.getAllRequestsForRide);

// Gets the status of a requests for a ride offer
router.get('/rides/:rideId/requests/:requestId/status', requestRideController.checkRequestStatus);

// 404 route
router.all('*', (req, res) => {
  res.status(404).json({ message: 'That route does not exist!' });
});

export default router;
