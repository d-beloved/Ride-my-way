'use strict';

var _chai = require('chai');

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('The Ride Offer routes', function () {
  describe('Register a ride offer route', function () {
    // Registers a ride offer
    it('Should return 400 for missing required fields', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/rides').send({
        title: 'Dave travels',
        driverName: 'Gulliver',
        destination: 'Los Angeles',
        depart: 'MMA 2 terminal',
        date: '',
        fee: 300000
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('date cannot be missing in the body!');
        done();
      });
    });
    it('Should return 409 if ride offer exists already', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/rides').send({
        title: 'Dave travels',
        driverName: 'GUO transport',
        destination: 'Abuja, Lagoon',
        depart: 'MMA 2 terminal',
        date: '2018-07-25',
        fee: 300000
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(409);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('A Ride Offer with same driver Name and destination is found!');
        done();
      });
    });
    it('Should return 406 if an invalid date is entered', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/rides').send({
        title: 'Dave travels',
        driverName: 'Gulliver',
        destination: 'Los Angeles',
        depart: 'MMA 2 terminal',
        date: '2018-06-20',
        fee: 300000
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(406);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Please enter a valid future date in this format (YYYY-MM-DD)');
        done();
      });
    });
    it('Should return status 400 if a non integer is entered as fee', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/rides').send({
        title: 'Dave travels',
        driverName: 'Gulliver',
        destination: 'Los Angeles',
        depart: 'MMA 2 terminal',
        date: '2018-07-25',
        fee: '300000'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(400);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Please enter a valid amount for the ride');
        done();
      });
    });
    it('Should return status 201 when ride offer is created', function (done) {
      (0, _supertest2.default)(_app2.default).post('/api/v1/rides').send({
        title: 'Dave travels',
        driverName: 'Gulliver',
        destination: 'Los Angeles',
        depart: 'MMA 2 terminal',
        date: '2018-07-25',
        fee: 300000
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(201);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Ride offer created successfully');
        done();
      });
    });
  });

  describe('Get all ride offers route', function () {
    // Returns result after searching for offers by destination
    it('Should return 404 if there is no ride with the queried destination', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/rides?destination=Dapchi').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('There is no Ride offer with the specified destination');
        done();
      });
    });
    it('Should return 200 if rides to the queried destination is found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/rides?destination=lagos').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        done();
      });
    });
    it('Should return 200 if ride offers were found or not found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/rides').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });
  });

  describe('Get one ride offer route', function () {
    it('Should return 200 if ride offer was found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/rides/1').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        done();
      });
    });
    it('Should return 404 if ride offer was not found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/rides/0').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Ride Offer not found!');
        done();
      });
    });
  });

  describe('Delete a ride offer', function () {
    /* Delete a Ride offer */
    it('Should return 404 if ride offer not found', function (done) {
      (0, _supertest2.default)(_app2.default).delete('/api/v1/rides/0').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Ride Offer not found or deleted already');
        done();
      });
    });
    it('Should return 200 if Ride offer was deleted successfully', function (done) {
      (0, _supertest2.default)(_app2.default).delete('/api/v1/rides/2').end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Ride Offer deleted successfully');
        done();
      });
    });
  });

  describe('Modify a Ride offer', function () {
    /* Modify a ride offer */
    it('Should return 404 if ride offer not found', function (done) {
      (0, _supertest2.default)(_app2.default).put('/api/v1/rides/0').send({
        title: 'Dave travels',
        driverName: 'Gullion',
        destination: 'Los Angeles',
        depart: 'MMA 2 terminal',
        date: '2018-07-27',
        fee: '300000'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(404);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Ride Offer not found!');
        done();
      });
    });
    it('Should return 200 if ride offer was edited successfully', function (done) {
      (0, _supertest2.default)(_app2.default).put('/api/v1/rides/3').send({
        title: 'Dave travels',
        driverName: 'Gullion',
        destination: 'Los Angeles',
        depart: 'MMA 2 terminal',
        date: '2018-07-27',
        fee: '300000'
      }).end(function (err, res) {
        (0, _chai.expect)(res.status).to.equal(200);
        (0, _chai.expect)(res.body).to.be.an('object');
        (0, _chai.expect)(res.body.message).to.equal('Ride Offer updated successfully!');
        done();
      });
    });
  });
});