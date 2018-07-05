'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description check if logged in user has a valid session token for protected routes
 * @param{object} req - api request
 * @param{object} res - route response
 * @param{object} next - moving to the next handler
 * @return{undefined}
 */
exports.default = {
  authenticate: function authenticate(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      res.status(401).send({ message: 'token is required!' });
    } else {
      // checks if token matches the one provided at login
      var rightToken = token.split(' ')[1]; // Splits the token to reveal the user
      _jsonwebtoken2.default.verify(rightToken, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
          res.status(401).send({ message: 'Authentication failed! Token is Invalid or expired. Please Login again' });
        } else {
          req.userData = decoded.userid;
          next();
        }
      });
    }
  }
};