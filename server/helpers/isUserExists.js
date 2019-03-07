import { Pool } from 'pg';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);

/**
   * @description Checks if a user already existed before creation
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
const ifUserExist = (req, res, next) => {
  const checkUser = `SELECT * FROM aUsers
                      WHERE username=$1 OR email=$2`;
  clientPool.connect()
    .then((client) => {
      client.query({
        text: checkUser,
        values: [req.body.username, req.body.email]
      })
        .then((foundMatch) => {
          client.release();
          if (!foundMatch.rows[0]) {
            return next();
          }
          return res.status(409).json({
            message: 'A user with same username and/or email is already registered',
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

export default ifUserExist;
