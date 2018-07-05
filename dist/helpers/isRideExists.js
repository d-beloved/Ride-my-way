'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _config = require('../config/config');

var clientPool = new _pg.Pool(_config.connectionString);

/**
   * @description Checks if a ride offer exists already before creation
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
var ifRideOfferExists = function ifRideOfferExists(req, res, next) {
  var checkoffer = 'SELECT * FROM Ride_offers\n                        WHERE destination=$1 AND date=$2 AND userId=$3';
  clientPool.connect().then(function (client) {
    client.query({
      text: checkoffer,
      values: [req.body.destination, req.body.date, req.userData]
    }).then(function (foundRide) {
      client.release();
      if (!foundRide.rows[0]) {
        next();
      }
      return res.status(409).json({
        message: 'You have created this ride before'
      });
    }).catch(function (err) {
      res.status(400).json({ message: err.errors ? err.errors[0].message : err.message });
    });
  });
};

exports.default = ifRideOfferExists;