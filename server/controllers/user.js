import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import createToken from '../helpers/createToken';
import { connectionString } from '../config/config';

const clientPool = new Pool(connectionString);

const secretKey = process.env.JWT_SECRET;

/**
 * @description - Describes the Users of the app, their creation, their editing e.t.c.
 */
class userController {
  /**
   * @description - Creates a new user in the app and assigns a token to them
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} the registered user's detail
   */
  static createUser(req, res) {
    // checks the length of the password and its validity
    if (
      req.body.password === undefined ||
      req.body.password === null ||
      req.body.password.length < 6
    ) {
      res.status(400).send({
        message: 'The password is too short! - make sure it is at least 6 characters long',
      });
    } else {
      // Hash password to save in the database
      const hashPassword = bcrypt.hashSync(req.body.password, 10);
      const email = req.body.email.trim().toLowerCase();
      const createUser = `INSERT INTO Users (username, email, password)
                            VALUES ($1, $2, $3)
                            RETURNING username, email, userId`;
      clientPool.connect()
        .then((client) => {
          client.query({
            text: createUser,
            values: [req.body.username, email, hashPassword]
          })
            .then((createdUser) => {
              const {
                userid
              } = createdUser.rows[0];
              // create the token after all the inputs are certified ok
              const authToken = createToken.token({ userid }, secretKey);
              client.release();
              res.status(201).json({
                message: 'User created successfully',
                data: {
                  userId: createdUser.rows[0].userid,
                  username: createdUser.rows[0].username,
                  email: createdUser.rows[0].email,
                  token: authToken,
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
  }

  /**
   * @description - Signs a user in by creating a session token
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @return{json} the user's login status
   */
  static loginUser(req, res) {
    const email = req.body.email.trim().toLowerCase();
    const findOneUser = `SELECT * FROM Users
                          WHERE email = $1`;
    // checks if a token was passed into the request header
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secretKey);
        req.userData = decoded.userid;
        if (req.userData !== null) {
          return res.status(200).json({ message: 'You are already logged in' });
        }
      } catch (error) {
        return res.status(401)
          .json({ message: 'Token is invalid or has expired, Please re-login' });
      }
    }

    clientPool.connect()
      .then((client) => {
        client.query({
          text: findOneUser,
          values: [email]
        })
          .then((user) => {
            client.release();
            if (user.rows[0]) { // If the user exists
              // check if the password is correct
              const signedInUser = user.rows[0].username;
              bcrypt.compare(req.body.password, user.rows[0].password).then((check) => {
                if (!check) { // If the password does not match
                  res.status(401).send({ message: 'wrong password!' });
                } else {
                  // creates a token that lasts for 24 hours
                  const {
                    userid
                  } = user.rows[0];
                  const authToken = createToken.token({ userid }, secretKey);
                  res.status(200).send({ message: 'You are logged in!', authToken, signedInUser });
                }
              })
                .catch(err => res.status(400).json({
                  message: err.errors ? err.errors[0].message : err.message
                }));
            } else {
              res.status(404).json({
                message: 'User not registered or wrong email',
                success: false,
              });
            }
          })
          .catch((err) => {
            res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
          });
      });
  }
}

export default userController;
