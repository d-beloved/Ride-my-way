'use strict';

var _pg = require('pg');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashedPassword = _bcrypt2.default.hashSync('ispassword', 10);

var seedUserData = {
  text: 'INSERT INTO users (firstname, lastname, email, password, role) VALUES($1, $2,$3,$4,$5)',
  values: ['Sinmi', 'John', 'sinmiloluwasunday@yahoo.com', hashedPassword, 'admin']
};
var seedRequestData1 = 'INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES\n(\'Damaged Chair\', \'we have a fault\', \'electrical\', \'\', \'approved\', \'2018-12-13\', 1);';
var seedRequestData2 = 'INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES\n(\'Faulty AC\', \'we have a fault\', \'electrical\', \'\', \'approved\', \'2018-12-13\', 1);';
var seedRequestData3 = 'INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES\n(\'Machine Fault\', \'we have a fault\', \'electrical\', \'\', \'disapproved\', \'2018-12-13\', 1);';
var seedRequestData4 = 'INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES\n(\'Electronic Fault\', \'we have a fault\', \'electrical\', \'\', \'disapproved\', \'2018-12-13\', 1);';
var seedRequestData5 = 'INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES\n(\'Damaged door\', \'we have a fault\', \'electrical\', \'\', \'resolved\', \'2018-12-13\', 1);';
var seedRequestData6 = 'INSERT INTO requests (title, description, category, image, status, dated, userId) VALUES\n(\'Broken Window\', \'we have a fault\', \'electrical\', \'\', \'resolved\', \'2018-12-13\', 1);';

var query = '' + seedRequestData1 + seedRequestData2 + seedRequestData3 + seedRequestData4 + seedRequestData5 + seedRequestData6;

var client = new _pg.Client(_config.connectionString);
client.connect();
client.query(seedUserData).then(function () {
  client.end();
  var client1 = new _pg.Client(_config.connectionString);
  client1.connect();
  client1.query(query).then(function () {
    return client1.end();
  }).catch(function () {
    return client1.end();
  });
}).catch(function () {
  return client.end();
});