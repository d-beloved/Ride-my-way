'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _config = require('../config/config');

var clientPool = new _pg.Pool(_config.connectionString);

/**
   * @description Checks if user has already requested for the ride
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
var ifRequestExist = function ifRequestExist(req, res, next) {
  var requestExist = 'SELECT * FROM Requests\n                        WHERE userId=$1 AND rideId=$2';
  clientPool.connect().then(function (client) {
    client.query({
      text: requestExist,
      values: [req.userData, parseInt(req.params.rideId, 10)]
    }).then(function (foundRequest) {
      client.release();
      if (!foundRequest.rows[0]) {
        next();
      }
      return res.status(409).json({
        message: 'You have requested for this ride before, be patient for the reply by the ride owner'
      });
    }).catch(function (err) {
      res.status(400).json({ message: err.errors ? err.errors[0].message : err.message });
    });
  });
};

exports.default = ifRequestExist;