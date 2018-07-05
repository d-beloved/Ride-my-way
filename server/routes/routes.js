import express from 'express';
import auth from '../helpers/auth';
import validateRequest from '../helpers/validation';
import userController from '../controllers/user';
import rideOfferController from '../controllers/rideOffer';
import requestRideController from '../controllers/requests';
import ifUserExist from '../helpers/isUserExists';
import ifRideOfferExists from '../helpers/isRideExists';
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
    }
  };
  res.status(200).json(rootMessage);
});


// signs up a user
router.post(
  '/auth/signup',
  validateRequest.trimsRequestBody,
  validateRequest.checkBodyContains('username', 'email', 'password'),
  // validateRequest.isString,
  validateRequest.confirmEmail,
  // ifUserExist,
  userController.createUser
);

// logs in a user
router.post(
  '/auth/login',
  validateRequest.trimsRequestBody,
  validateRequest.checkBodyContains('email', 'password'),
  // validateRequest.isString,
  validateRequest.confirmEmail,
  userController.loginUser
);


// Create a ride offer
router.post(
  '/users/rides',
  auth.authenticate,
  validateRequest.trimsRequestBody,
  validateRequest.checkBodyContains('message', 'destination', 'depart', 'date'),
  validateRequest.isString,
  ifRideOfferExists,
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
  res.status(404).json({ message: 'That route does not exist!' });
});

export default router;
