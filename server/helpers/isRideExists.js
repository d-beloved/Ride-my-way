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
  const checkoffer = `SELECT * FROM bRide_offers
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
            return next();
          }
          return res.status(409).json({
            message: 'You have created this ride before',
            success: false
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
};

export default ifRideOfferExists;
