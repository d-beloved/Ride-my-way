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
    const createRide = `INSERT INTO bRide_offers (userId, message, destination, 
                        departurelocation, date)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING *`;
    clientPool.connect()
      .then((client) => {
        client.query({
          text: createRide,
          values: [req.userData, req.body.message, req.body.destination, req.body.departurelocation,
            req.body.date
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
                userId: createdRide.rows[0].userId,
              },
              success: true
            });
          })
          .catch((err) => {
            if (err) {
              res.status(400).send({
                message: 'Wrong input detected',
                success: false
              });
            }
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
    const getAll = 'SELECT * from bRide_offers';
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
                success: true
              });
            }
            return res.status(200).json({
              message: 'These are the ride offers we have',
              data: result.rows,
              success: true
            });
          })
          .catch((err) => {
            client.release();
            if (err) {
              res.status(500).json({
                message: 'You are not sending the right request',
                success: false
              });
            }
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
    const getOne = `select *  from bRide_offers 
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
                message: 'Ride Offer not found!',
                success: false
              });
            }
            return res.status(200).json({
              message: 'Ride offer delivered',
              data: result.rows[0],
              success: true
            });
          })
          .catch((err) => {
            client.release();
            if (err) {
              res.status(500).json({
                message: '',
                success: false
              });
            }
          });
      });
  }
}

export default rideOfferController;
