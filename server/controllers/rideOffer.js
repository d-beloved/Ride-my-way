import { Pool } from 'pg';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);


/**
 * @description - creates the Ride offer components and performs CRUD functions on it
 */
class rideOfferController {
  /**
   * @description - Creates a new ride offer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} registered ride offer details
   */
  static createRideOffer(req, res) {
    const createRide = `INSERT INTO Ride_offers (userId, message, destination, 
                        depart, time, date, seats)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        RETURNING *`;
    clientPool.connect()
      .then((client) => {
        client.query({
          text: createRide,
          values: [req.userData, req.body.message, req.body.destination, req.body.depart,
            req.body.time, req.body.date, req.body.seats
          ]
        })
          .then((createdRide) => {
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
                userId: createdRide.rows[0].userId,
              },
            });
          })
          .catch((err) => {
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
  static getAllRideOffer(req, res) {
    const getAll = 'SELECT * from Ride_offers';
    clientPool.connect()
      .then((client) => {
        client.query({
          text: getAll
        })
          .then((result) => {
            client.release();
            if (result.rows.length === 0) {
              return res.status(200).json({
                message: 'We don\'t have any ride offers yet, check back later please',
              });
            }
            return res.status(200).json({
              data: result.rows
            });
          })
          .catch((err) => {
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
  static getOneRideOffer(req, res) {
    const rideOfferId = parseInt(req.params.rideId, 10);
    const getOne = `select *  from Ride_offers 
                    where rideId=$1`;
    clientPool.connect()
      .then((client) => {
        client.query({
          text: getOne,
          values: [rideOfferId]
        })
          .then((result) => {
            client.release();
            if (!result.rows[0]) {
              return res.status(404).json({
                message: 'Ride Offer not found!'
              });
            }
            return res.status(200).json({
              data: result.rows[0]
            });
          })
          .catch((err) => {
            client.release();
            res.status(500).json({
              message: err.errors ? err.errors[0].message : err.message
            });
          });
      });
  }

  /**
   * @description - Deletes a ride offer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} a json message
   */
  static deleteRideOffer(req, res) {
    const offerId = parseInt(req.params.rideId, 10);
    // finds the element index with the parsed id
    const offer = rideOffer.findIndex(oneRide => oneRide.id === offerId);
    if (offer === -1) {
      return res.status(404).json({
        message: 'Ride Offer not found or deleted already',
        success: false
      });
    }
    rideOffer.splice(offer, 1);
    return res.status(200).json({
      message: 'Ride Offer deleted successfully',
      success: true
    });
  }

  /**
   * @description - Edit a ride offer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} a json message
   */
  static modifyRideOffer(req, res) {
    const offerId = parseInt(req.params.rideId, 10);
    // finds the element index with the parsed id
    const offer = rideOffer.findIndex(oneRide => oneRide.id === offerId);
    if (offer === -1) {
      return res.status(404).json({
        message: 'Ride Offer not found!',
        success: false
      });
    }
    const offerEdited = rideOffer.find(oneRide => oneRide.id === offerId);
    // Edits the value of the found ride offer
    rideOffer[offer].title = req.body.title || rideOffer[offer].title;
    rideOffer[offer].driverName = req.body.driverName || rideOffer[offer].driverName;
    rideOffer[offer].destination = req.body.destination || rideOffer[offer].destination;
    rideOffer[offer].depart = req.body.depart || rideOffer[offer].depart;
    rideOffer[offer].date = req.body.date || rideOffer[offer].date;
    rideOffer[offer].fee = req.body.fee || rideOffer[offer].fee;
    return res.status(200).json({
      message: 'Ride Offer updated successfully!',
      offerEdited,
      success: true
    });
  }
}

export default rideOfferController;
