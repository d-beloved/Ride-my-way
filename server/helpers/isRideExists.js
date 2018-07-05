import { Pool } from 'pg';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);

/**
   * @description Checks if a ride offer exists already before creation
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
const ifRideOfferExists = (req, res, next) => {
  const checkoffer = `SELECT * FROM Ride_offers
                        WHERE destination=$1 AND date=$2 AND userId=$3`;
  clientPool.connect()
    .then((client) => {
      client.query({
        text: checkoffer,
        values: [req.body.destination, req.body.date, req.userData]
      })
        .then((foundRide) => {
          client.release();
          if (!foundRide.rows[0]) {
            next();
          }
          return res.status(409).json({
            message: 'You have created this ride before',
          });
        })
        .catch((err) => {
          res.status(400).json({ message: err.errors ? err.errors[0].message : err.message });
        });
    });
};

export default ifRideOfferExists;