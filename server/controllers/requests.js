import { Pool } from 'pg';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);

/**
 * @description - creates the request to join a Ride offer components
 */
class requestRideController {
  /**
   * @description - Creates a new request for Ride
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} message and status code
   */
  static makeRequestForRide(req, res) {
    const getOne = `select *  from Ride_offers 
                    where rideid=$1`;
    const requestRide = `INSERT INTO Requests (userId, rideId,
                          status)
                          VALUES ($1, $2, $3)`;
    clientPool.connect()
      .then((client1) => {
        client1.query({
          text: getOne,
          values: [parseInt(req.params.rideId, 10)]
        })
          .then((foundRide) => {
            client1.release();
            if (!foundRide.rows[0]) {
              return res.status(404).json({
                message: 'The ride Offer is not found!',
                success: false
              });
            }
            if ((foundRide.rows[0]).userid === req.userData) {
              return res.status(406).json({
                message: 'You cannot request for your ride, calm down',
                success: false
              });
            }
            clientPool.connect()
              .then((client) => {
                client.query({
                  text: requestRide,
                  values: [req.userData, parseInt(req.params.rideId, 10), 'pending']
                })
                  .then(() => {
                    client.release();
                    return res.status(201).json({
                      message: 'Your request for this ride is registered, Pending for acceptance. Thanks a lot!',
                      success: true
                    });
                  })
                  .catch((err) => {
                    if (err) {
                      res.status(400).send({
                        message: 'An error occured',
                        success: false
                      });
                    }
                  });
              });
          })
          .catch((err) => {
            if (err) {
              res.status(500).send({
                message: 'An error occured',
                success: false
              });
            }
          });
      });
  }

  /**
   * @description - Get all requests for a ride offer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered requests for ride offer details
   */
  static getAllRequestsForRide(req, res) {
    const offerId = parseInt(req.params.rideId, 10);
    const checkOwner = `SELECT * FROM Ride_offers
                        WHERE userId=$1 AND rideId=$2`;
    const checkRequests = 'SELECT *  FROM requests WHERE rideId=$1';
    clientPool.connect()
      .then((client) => {
        client.query({
          text: checkOwner,
          values: [req.userData, offerId]
        })
          .then((isOwner) => {
            client.release();
            if (!isOwner.rows[0]) {
              return res.status(403).json({
                message: 'You are not allowed to view the requests for this ride',
                success: false
              });
            }
            clientPool.connect()
              .then((client1) => {
                client1.query({
                  text: checkRequests,
                  values: [offerId]
                })
                  .then((foundRequests) => {
                    client1.release();
                    if (foundRequests.rows.length === 0) {
                      return res.status(200).json({
                        message: 'No one has requested for your ride offer yet, check back later',
                        success: true
                      });
                    }
                    return res.status(200).json({
                      message: 'Your ride has been requested by:',
                      data: foundRequests.rows,
                      success: true
                    });
                  })
                  .catch((err) => {
                    if (err) {
                      res.status(400).send({
                        message: 'An error occured',
                        success: false
                      });
                    }
                  });
              });
          })
          .catch((err) => {
            if (err) {
              res.status(500).send({
                message: 'An error occured',
                success: false
              });
            }
          });
      });
  }

  /**
   * @description - Update the status of requests for a ride offer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} New status assigned for ride offer
   */
  static updateRequestStatus(req, res) {
    const offerId = parseInt(req.params.rideId, 10);
    const reqId = parseInt(req.params.requestId, 10);
    const newStatus = req.body.status.toLowerCase();
    const checkOwner = `SELECT * FROM Ride_offers
                        WHERE userId=$1 AND rideId=$2`;
    const updateRequests = `UPDATE requests 
                            SET status=$1
                            WHERE requestId=$2`;
    clientPool.connect()
      .then((client) => {
        client.query({
          text: checkOwner,
          values: [req.userData, offerId]
        })
          .then((isOwner) => {
            client.release();
            if (!isOwner.rows[0]) {
              return res.status(403).json({
                message: 'The ride and/or request does not exist or you are not allowed to update the status of this request',
                success: true
              });
            }
            clientPool.connect()
              .then((client1) => {
                client1.query({
                  text: updateRequests,
                  values: [newStatus, reqId]
                })
                  .then(() => {
                    client1.release();
                    return res.status(202).json({
                      message: 'The status of the request has been updated successfully',
                      success: true
                    });
                  })
                  .catch((err) => {
                    if (err) {
                      res.status(406).send({
                        message: 'You are entering a wrong value, it\'s either you enter accepted or rejected',
                        success: false
                      });
                    }
                  });
              });
          });
      });
  }
}

export default requestRideController;
