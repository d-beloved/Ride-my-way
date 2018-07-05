'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../helpers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _validation = require('../helpers/validation');

var _validation2 = _interopRequireDefault(_validation);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _rideOffer = require('../controllers/rideOffer');

var _rideOffer2 = _interopRequireDefault(_rideOffer);

var _requests = require('../controllers/requests');

var _requests2 = _interopRequireDefault(_requests);

var _isUserExists = require('../helpers/isUserExists');

var _isUserExists2 = _interopRequireDefault(_isUserExists);

var _isRideExists = require('../helpers/isRideExists');

var _isRideExists2 = _interopRequireDefault(_isRideExists);

var _isIdValid = require('../helpers/isIdValid');

var _isIdValid2 = _interopRequireDefault(_isIdValid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// using router routes
var router = _express2.default.Router();

/** ****************** MY API ENDPOINTS *************** */

// Welcome message route
router.get('/', function (req, res) {
  var rootMessage = {
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
router.post('/auth/signup', _validation2.default.trimsRequestBody, _validation2.default.checkBodyContains('username', 'email', 'password'), _validation2.default.isString, _validation2.default.confirmEmail, _isUserExists2.default, _user2.default.createUser);

// logs in a user
router.post('/auth/login', _validation2.default.trimsRequestBody, _validation2.default.checkBodyContains('email', 'password'), _validation2.default.isString, _validation2.default.confirmEmail, _user2.default.loginUser);

// Create a ride offer
router.post('/users/rides', _auth2.default.authenticate, _validation2.default.trimsRequestBody, _validation2.default.checkBodyContains('message', 'destination', 'depart', 'date'), _validation2.default.isString, _isRideExists2.default, _rideOffer2.default.createRideOffer);

// Get all ride offers
router.get('/rides', _rideOffer2.default.getAllRideOffer);

// Get one ride offer
router.get('/rides/:rideId', _isIdValid2.default, _auth2.default.authenticate, _rideOffer2.default.getOneRideOffer);

// Requests for a ride offer
router.post('/rides/:rideId/requests', _isIdValid2.default, _auth2.default.authenticate, _requests2.default.makeRequestForRide);

// Get all the requests for a ride offer
router.get('/users/rides/:rideId/requests', _isIdValid2.default, _auth2.default.authenticate, _requests2.default.getAllRequestsForRide);

// Accepts or rejects a ride offer
router.put('/users/rides/:rideId/requests/:requestId', _isIdValid2.default, _auth2.default.authenticate, _validation2.default.checkBodyContains('status'), _requests2.default.updateRequestStatus);

// 404 route
router.all('*', function (req, res) {
  res.status(404).json({ message: 'That route does not exist!' });
});

exports.default = router;