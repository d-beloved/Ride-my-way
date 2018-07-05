'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pg = require('pg');

var _config = require('../config/config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clientPool = new _pg.Pool(_config.connectionString);

/**
 * @description - creates the Ride offer components and performs CRUD functions on it
 */

var rideOfferController = function () {
  function rideOfferController() {
    _classCallCheck(this, rideOfferController);
  }

  _createClass(rideOfferController, null, [{
    key: 'createRideOffer',

    /**
     * @description - Creates a new ride offer
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json} registered ride offer details
     */
    value: function createRideOffer(req, res) {
      var createRide = 'INSERT INTO Ride_offers (userId, message, destination, \n                        depart, date)\n                        VALUES ($1, $2, $3, $4, $5)\n                        RETURNING *';
      clientPool.connect().then(function (client) {
        client.query({
          text: createRide,
          values: [req.userData, req.body.message, req.body.destination, req.body.depart, req.body.time, req.body.date, req.body.seats]
        }).then(function (createdRide) {
          client.release();
          res.status(201).json({
            message: 'Your ride offer is created successfully',
            data: {
              rideId: createdRide.rows[0].rideId,
              message: createdRide.rows[0].message,
              destination: createdRide.rows[0].destination,
              departureLocation: createdRide.rows[0].depart,
              time: createdRide.rows[0].time,
              date: createdRide.rows[0].date,
              seats: createdRide.rows[0].seats,
              userId: createdRide.rows[0].userId
            }
          });
        }).catch(function (err) {
          client.release();
          res.status(400).send({
            message: err.errors ? err.errors[0].message : err.message
          });
        });
      });
    }

    /**
     * @description - Get all ride offers
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json} registered ride offer details
     */

  }, {
    key: 'getAllRideOffer',
    value: function getAllRideOffer(req, res) {
      var getAll = 'SELECT * from Ride_offers';
      clientPool.connect().then(function (client) {
        client.query({
          text: getAll
        }).then(function (result) {
          client.release();
          if (result.rows.length === 0) {
            return res.status(200).json({
              message: 'We don\'t have any ride offers yet, check back later please'
            });
          }
          return res.status(200).json({
            data: result.rows
          });
        }).catch(function (err) {
          client.release();
          res.status(500).json({
            message: err.errors ? err.errors[0].message : err.message
          });
        });
      });
    }

    /**
     * @description - Get one ride offer
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json} registered ride offer details
     */

  }, {
    key: 'getOneRideOffer',
    value: function getOneRideOffer(req, res) {
      var rideOfferId = parseInt(req.params.rideId, 10);
      var getOne = 'select *  from Ride_offers \n                    where rideId=$1';
      clientPool.connect().then(function (client) {
        client.query({
          text: getOne,
          values: [rideOfferId]
        }).then(function (result) {
          client.release();
          if (!result.rows[0]) {
            return res.status(404).json({
              message: 'Ride Offer not found!'
            });
          }
          return res.status(200).json({
            data: result.rows[0]
          });
        }).catch(function (err) {
          client.release();
          res.status(500).json({
            message: err.errors ? err.errors[0].message : err.message
          });
        });
      });
    }
  }]);

  return rideOfferController;
}();

exports.default = rideOfferController;