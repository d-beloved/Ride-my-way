'use strict';

var _pg = require('pg');

var _config = require('../config/config');

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _rideOffers = require('./rideOffers');

var _rideOffers2 = _interopRequireDefault(_rideOffers);

var _requests = require('./requests');

var _requests2 = _interopRequireDefault(_requests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeQuery = function makeQuery(query) {
  var client = new _pg.Client(_config.connectionString);
  client.connect();
  client.query(query).then(function () {
    return client.end();
  }).catch(function () {
    return client.end();
  });
};
makeQuery('' + _users2.default + _rideOffers2.default + _requests2.default);