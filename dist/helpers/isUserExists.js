'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _config = require('../config/config');

var clientPool = new _pg.Pool(_config.connectionString);

/**
   * @description Checks if a user already existed before creation
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
var ifUserExist = function ifUserExist(req, res, next) {
  var checkUser = 'SELECT * FROM Users\n                      WHERE username=$1 OR email=$2';
  clientPool.connect().then(function (client) {
    client.query({
      text: checkUser,
      values: [req.body.username, req.body.email]
    }).then(function (foundMatch) {
      client.release();
      if (!foundMatch.rows[0]) {
        next();
      }
      return res.status(409).json({
        message: 'A user with same username and/or email is already registered'
      });
    }).catch(function (err) {
      res.status(400).json({ message: err.errors ? err.errors[0].message : err.message });
    });
  });
};

exports.default = ifUserExist;