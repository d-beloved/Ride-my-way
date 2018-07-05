'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rideOffer = require('./rideOffer');

var _rideOffer2 = _interopRequireDefault(_rideOffer);

var _requests = require('./requests');

var _requests2 = _interopRequireDefault(_requests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = {
  rideOffer: _rideOffer2.default,
  request: _requests2.default
};

exports.default = db;