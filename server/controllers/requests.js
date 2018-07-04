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
                      message: 'Your request for this ride is registered, Pending for acceptance. Thanks a lot!'
                    });
                  })
                  .catch((err) => {
                    res.status(400).json({
                      message: err.errors ? err.errors[0].message : err.message
                    });
                  });
              });
          })
          .catch((err) => {
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
  static getAllRequestsForRide(req, res) {
    const offerId = parseInt(req.params.rideId, 10);
    // finds the element with the parsed id
    const offer = rideOffer.findIndex(oneRide => oneRide.id === offerId);
    if (offer === -1) {
      return res.status(404).json({
        message: 'Ride Offer with the specified Id not found!',
        success: false
      });
    }
    return res.status(200).json({
      request,
      success: true
    });
  }

  /**
   * @description - Get the status of requests for a ride offer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered requests status for ride offer details
   */
  static checkRequestStatus(req, res) {
    // checks the specified ride offer
    const offerId = parseInt(req.params.rideId, 10);
    const offer = rideOffer.findIndex(oneRide => oneRide.id === offerId);
    if (offer === -1) {
      return res.status(404).json({
        message: 'The ride Offer is not found!',
        success: false
      });
    }
    // checks for the specified request
    const reqId = parseInt(req.params.requestId, 10);
    const requestId = request.findIndex(oneReq => oneReq.id === reqId);
    if (requestId === -1) {
      return res.status(404).json({
        message: 'The request is not found!',
        success: false
      });
    }
    return res.status(200).json({
      message: `The status of your request for Offer '${rideOffer[offer].title}' is ${request[requestId].status}`,
      success: true
    });
  }
}

export default requestRideController;
