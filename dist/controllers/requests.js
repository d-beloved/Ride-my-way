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
 * @description - creates the request to join a Ride offer components
 */

var requestRideController = function () {
  function requestRideController() {
    _classCallCheck(this, requestRideController);
  }

  _createClass(requestRideController, null, [{
    key: 'makeRequestForRide',

    /**
     * @description - Creates a new request for Ride
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json} message and status code
     */
    value: function makeRequestForRide(req, res) {
      var getOne = 'select *  from Ride_offers \n                    where rideid=$1';
      var requestRide = 'INSERT INTO Requests (userId, rideId,\n                          status)\n                          VALUES ($1, $2, $3)';
      clientPool.connect().then(function (client1) {
        client1.query({
          text: getOne,
          values: [parseInt(req.params.rideId, 10)]
        }).then(function (foundRide) {
          client1.release();
          if (!foundRide.rows[0]) {
            return res.status(404).json({
              message: 'The ride Offer is not found!'
            });
          }
          clientPool.connect().then(function (client) {
            client.query({
              text: requestRide,
              values: [req.userData, parseInt(req.params.rideId, 10), 'pending']
            }).then(function () {
              client.release();
              return res.status(201).json({
                message: 'Your request for this ride is registered, Pending for acceptance. Thanks a lot!'
              });
            }).catch(function (err) {
              res.status(400).json({
                message: err.errors ? err.errors[0].message : err.message
              });
            });
          });
        }).catch(function (err) {
          res.status(400).json({
            message: err.errors ? err.errors[0].message : err.message
          });
        });
      });
    }

    /**
     * @description - Get all requests for a ride offer
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json} registered requests for ride offer details
     */

  }, {
    key: 'getAllRequestsForRide',
    value: function getAllRequestsForRide(req, res) {
      var offerId = parseInt(req.params.rideId, 10);
      var checkOwner = 'SELECT * FROM Ride_offers\n                        WHERE userId=$1 AND rideId=$2';
      var checkRequests = 'SELECT *  FROM requests WHERE rideId=$1';
      clientPool.connect().then(function (client) {
        client.query({
          text: checkOwner,
          values: [req.userData, offerId]
        }).then(function (isOwner) {
          client.release();
          if (!isOwner.rows[0]) {
            return res.status(403).json({
              message: 'You are not allowed to view the requests for this ride'
            });
          }
          clientPool.connect().then(function (client1) {
            client1.query({
              text: checkRequests,
              values: [offerId]
            }).then(function (foundRequests) {
              client1.release();
              if (foundRequests.rows.length === 0) {
                return res.status(200).json({
                  message: 'No one has requested for your ride offer yet, check back later'
                });
              }
              return res.status(200).json({
                message: 'Your ride has been requested by:',
                data: foundRequests.rows
              });
            }).catch(function (err) {
              res.status(400).json({
                message: err.errors ? err.errors[0].message : err.message
              });
            });
          });
        }).catch(function (err) {
          res.status(400).json({
            message: err.errors ? err.errors[0].message : err.message
          });
        });
      });
    }

    /**
     * @description - Update the status of requests for a ride offer
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json} New status assigned for ride offer
     */

  }, {
    key: 'updateRequestStatus',
    value: function updateRequestStatus(req, res) {
      var offerId = parseInt(req.params.rideId, 10);
      var reqId = parseInt(req.params.requestId, 10);
      var newStatus = req.body.status.toLowerCase();
      var checkOwner = 'SELECT * FROM Ride_offers\n                        WHERE userId=$1 AND rideId=$2';
      var updateRequests = 'UPDATE requests \n                            SET status=$1\n                            WHERE requestId=$2';
      clientPool.connect().then(function (client) {
        client.query({
          text: checkOwner,
          values: [req.userData, offerId]
        }).then(function (isOwner) {
          client.release();
          if (!isOwner.rows[0]) {
            return res.status(403).json({
              message: 'The ride and/or request does not exist or you are not allowed to update the status of this request'
            });
          }
          clientPool.connect().then(function (client1) {
            client1.query({
              text: updateRequests,
              values: [newStatus, reqId]
            }).then(function () {
              client1.release();
              if (newStatus !== 'accepted' || newStatus !== 'rejected') {
                return res.status(406).json({
                  message: 'You are entering a wrong value, it\'s either accepted or rejected (as a string)'
                });
              }
              return res.status(202).json({
                message: 'The status of the request has been updated successfully'
              });
            }).catch(function (err) {
              res.status(406).json({
                message: err.errors ? err.errors[0].message : err.message
              });
            });
          });
        }).catch(function (err) {
          res.status(400).json({
            message: err.errors ? err.errors[0].message : err.message
          });
        });
      });
    }
  }]);

  return requestRideController;
}();

exports.default = requestRideController;