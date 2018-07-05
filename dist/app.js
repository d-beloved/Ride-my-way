'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// set router for api endpoints
app.use('/api/v1', _routes2.default);

// set the port for the server
var port = process.env.PORT || 3110;
app.listen(port, function () {
  /* eslint-disable no-console */
  console.log('Ride-my-way App is Listening on port ' + port + '!');
});

// This will be our application entry. Our server is setup here.

exports.default = app;