'use strict';

var _chai = require('chai');

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('The request for ride routes', function () {
  describe('Request for a ride offer', function () {
    it('Should return 400 for missing required fields', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/rides/1/requests').send({
        requester: ''
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('requester cannot be missing in the body!');
        done();
      });
    });
    it('Should return 404 if ride offer is not found', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/rides/0/requests').send({
        requester: 'David Mills'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Ride Offer not found!');
        done();
      });
    });
    it('Should return 201 if the request for a ride was successful', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/rides/1/requests').send({
        requester: 'David Mills'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Your request is registered, Pending for acceptance. Thanks a lot!');
        done();
      });
    });
  });

  describe('Get all request for a ride offer', function () {
    it('Should return 404 if the ride offer is not found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/rides/0/requests').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Ride Offer with the specified Id not found!');
        done();
      });
    });
    it('Should return 200 if the requests for the ride offer is returned', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/rides/1/requests').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });
  });

  describe('Checks the status of a request for a ride', function () {
    it('Should return 404 if the ride offer is not found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/rides/0/requests/1/status').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('The ride Offer is not found!');
        done();
      });
    });
    it('Should return 404 if the request is not found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/rides/3/requests/0/status').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('The request is not found!');
        done();
      });
    });
    it('Should return 200 if the status of the requests for the ride offer is not found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/rides/3/requests/1/status').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('The status of your request for Offer \'A glide through the Forest savannah\' is pending');
        done();
      });
    });
  });
});