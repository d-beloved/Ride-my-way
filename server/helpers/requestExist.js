import { Pool } from 'pg';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);

/**
   * @description Checks if user has already requested for the ride
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
const ifRequestExist = (req, res, next) => {
  const requestExist = `SELECT * FROM Requests
                        WHERE userId=$1 AND rideId=$2`;
  clientPool.connect()
    .then((client) => {
      client.query({
        text: requestExist,
        values: [req.userData, parseInt(req.params.rideId, 10)]
      })
        .then((foundRequest) => {
          client.release();
          if (!foundRequest.rows[0]) {
            next();
          }
          return res.status(409).json({
            message: 'You have requested for this ride before, be patient for the reply by the ride owner',
          });
        })
        .catch((err) => {
          res.status(400).json({ message: err.errors ? err.errors[0].message : err.message });
        });
    });
};

export default ifRequestExist;
