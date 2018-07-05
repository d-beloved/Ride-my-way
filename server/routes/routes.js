import express from 'express';
import auth from '../helpers/auth';
import validateRequest from '../helpers/validation';
import userController from '../controllers/user';
import rideOfferController from '../controllers/rideOffer';
import requestRideController from '../controllers/requests';
import idValidator from '../helpers/isIdValid';

// using router routes
const router = express.Router();

/** ****************** MY API ENDPOINTS *************** */

// Welcome message route
router.get('/', (req, res) => {
  const rootMessage = {
    message: 'Welcome to Ride-My-Way app! Your one stop place to get rides to your desired destination at reasonable prices',
    endpoints: {
      signup: 'POST /api/v1/auth/signup',
      login: 'POST /api/v1/auth/login',
      getAllRideOffer: 'GET /api/v1/rides',
      getOneRideOffer: 'GET /api/v1/rides/:rideId',
      makeRequestForRide: 'POST /api/v1/rides/:rideId/requests',
      createRideOffer: 'POST /api/v1/users/rides',
      getAllRequestsForRide: 'GET /api/v1/GET /users/rides/:rideId/requests',
      acceptRejectRequests: 'PUT /api/v1//users/rides/:rideId/requests/:requestId'
    },
    success: true
  };
  res.status(200).json(rootMessage);
});


// signs up a user
router.post(
  '/auth/signup',
  validateRequest.trimsRequestBody,
  validateRequest.checkBodyContains('firstname', 'lastname', 'phoneno', 'username', 'email', 'password'),
  validateRequest.confirmEmail,
  userController.createUser
);

// logs in a user
router.post(
  '/auth/login',
  validateRequest.trimsRequestBody,
  validateRequest.checkBodyContains('email', 'password'),
  validateRequest.confirmEmail,
  userController.loginUser
);


// Create a ride offer
router.post(
  '/users/rides',
  auth.authenticate,
  validateRequest.trimsRequestBody,
  validateRequest.checkBodyContains('message', 'destination', 'depart', 'date'),
  rideOfferController.createRideOffer
);

// Get all ride offers
router.get('/rides', rideOfferController.getAllRideOffer);

// Get one ride offer
router.get(
  '/rides/:rideId',
  idValidator,
  auth.authenticate,
  rideOfferController.getOneRideOffer
);

// Requests for a ride offer
router.post(
  '/rides/:rideId/requests',
  idValidator,
  auth.authenticate,
  requestRideController.makeRequestForRide
);

// Get all the requests for a ride offer
router.get(
  '/users/rides/:rideId/requests',
  idValidator,
  auth.authenticate,
  requestRideController.getAllRequestsForRide
);

// Accepts or rejects a ride offer
router.put(
  '/users/rides/:rideId/requests/:requestId',
  idValidator,
  auth.authenticate,
  validateRequest.checkBodyContains('status'),
  requestRideController.updateRequestStatus
);

// 404 route
router.all('*', (req, res) => {
  const errorMessage = {
    message: 'You are hitting a wrong route, find the valid routes below',
    endpoints: {
      signup: 'POST /api/v1/auth/signup',
      login: 'POST /api/v1/auth/login',
      getAllRideOffer: 'GET /api/v1/rides',
      getOneRideOffer: 'GET /api/v1/rides/:rideId',
      makeRequestForRide: 'POST /api/v1/rides/:rideId/requests',
      createRideOffer: 'POST /api/v1/users/rides',
      getAllRequestsForRide: 'GET /api/v1/GET /users/rides/:rideId/requests',
      acceptRejectRequests: 'PUT /api/v1//users/rides/:rideId/requests/:requestId'
    },
    success: false
  };
  res.status(404).json(errorMessage);
});

export default router;

