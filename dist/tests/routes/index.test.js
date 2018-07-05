'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('GET: / Tests for index or unregistered routes', function () {
  it('should return status code 404 when user visit an unregistered route', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/anyUnregisteredRoute').end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(404);
      (0, _chai.expect)(res.body.message).to.equal('That route does not exist!');
      done();
    });
  });
  it('should return status code 200 when user visits the index route', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/').end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body).to.be.a('object');
      done();
    });
  });
});