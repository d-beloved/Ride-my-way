'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _pg = require('pg');

var _createToken = require('../helpers/createToken');

var _createToken2 = _interopRequireDefault(_createToken);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clientPool = new _pg.Pool(_config.connectionString);

var secretKey = process.env.JWT_SECRET;

/**
 * @description - Describes the Users of the app, their creation, their editing e.t.c.
 */

var userController = function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: 'createUser',

    /**
     * @description - Creates a new user in the app and assigns a token to them
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @return{json} the registered user's detail
     */
    value: function createUser(req, res) {
      // checks the length of the password and its validity
      if (req.body.password === undefined || req.body.password === null || req.body.password.length < 6) {
        res.status(400).send({
          message: 'The password is too short! - make sure it is at least 6 characters long'
        });
      } else {
        // Hash password to save in the database
        var hashPassword = _bcrypt2.default.hashSync(req.body.password, 10);
        var email = req.body.email.trim().toLowerCase();
        var createUser = 'INSERT INTO Users (username, email, password)\n                            VALUES ($1, $2, $3)\n                            RETURNING username, email, userId';
        clientPool.connect().then(function (client) {
          client.query({
            text: createUser,
            values: [req.body.username, email, hashPassword]
          }).then(function (createdUser) {
            var userid = createdUser.rows[0].userid;
            // create the token after all the inputs are certified ok

            var authToken = _createToken2.default.token({ userid: userid }, secretKey);
            client.release();
            res.status(201).json({
              message: 'User created successfully',
              data: {
                userId: createdUser.rows[0].userid,
                username: createdUser.rows[0].username,
                email: createdUser.rows[0].email,
                token: authToken
              }
            });
          }).catch(function (err) {
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

  }, {
    key: 'loginUser',
    value: function loginUser(req, res) {
      var email = req.body.email.trim().toLowerCase();
      var findOneUser = 'SELECT * FROM Users\n                          WHERE email = $1';
      // checks if a token was passed into the request header
      if (req.headers.authorization) {
        try {
          var token = req.headers.authorization.split(' ')[1];
          var decoded = _jsonwebtoken2.default.verify(token, secretKey);
          req.userData = decoded.userid;
          if (req.userData !== null) {
            return res.status(200).json({ message: 'You are already logged in' });
          }
        } catch (error) {
          return res.status(401).json({ message: 'Token is invalid or has expired, Please re-login' });
        }
      }

      clientPool.connect().then(function (client) {
        client.query({
          text: findOneUser,
          values: [email]
        }).then(function (user) {
          client.release();
          if (user.rows[0]) {
            // If the user exists
            // check if the password is correct
            var signedInUser = user.rows[0].username;
            _bcrypt2.default.compare(req.body.password, user.rows[0].password).then(function (check) {
              if (!check) {
                // If the password does not match
                res.status(401).send({ message: 'wrong password!' });
              } else {
                // creates a token that lasts for 24 hours
                var userid = user.rows[0].userid;

                var authToken = _createToken2.default.token({ userid: userid }, secretKey);
                res.status(200).send({ message: 'You are logged in!', authToken: authToken, signedInUser: signedInUser });
              }
            }).catch(function (err) {
              return res.status(400).json({
                message: err.errors ? err.errors[0].message : err.message
              });
            });
          } else {
            res.status(404).json({
              message: 'User not registered or wrong email',
              success: false
            });
          }
        }).catch(function (err) {
          res.status(400).send({ message: err.errors ? err.errors[0].message : err.message });
        });
      });
    }
  }]);

  return userController;
}();

exports.default = userController;