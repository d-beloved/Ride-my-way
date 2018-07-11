import jwt from 'jsonwebtoken';
import request from 'supertest';
import { expect } from 'chai';
import server from '../../app';

const wrongtoken = 'wrong secret';
const authToken1 = jwt.sign({ userid: 3 }, process.env.JWT_SECRET);
const token = `Bearer ${authToken1}`;

describe('The Ride Offer routes', () => {
  describe('A user is authenticated with a token', () => {
    it('Should return 401 for an empty token', (done) => {
      request(server)
        .post('/api/v1/users/rides')
        .set({ authorization: '' })
        .send({
          message: 'Dave travels',
          destination: 'Los Angeles',
          departurelocation: 'MMA 2 terminal',
          date: '27-07-2018'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('token is required!');
          done();
        });
    });
    it('Should return 401 for a wrong token', (done) => {
      request(server)
        .post('/api/v1/users/rides')
        .set({ authorization: wrongtoken })
        .send({
          message: 'Dave travels',
          destination: 'Los Angeles',
          departurelocation: 'MMA 2 terminal',
          date: '27-07-2018'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Authentication failed! Token is Invalid or expired. Please Login again');
          done();
        });
    });
  });

  describe('Register a ride offer route', () => {
    // Registers a ride offer
    it('Should return 400 for missing required fields', (done) => {
      request(server)
        .post('/api/v1/users/rides')
        .set({ authorization: token })
        .send({
          message: 'Dave travels',
          destination: 'Los Angeles',
          departurelocation: 'MMA 2 terminal',
          date: ' '
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('date cannot be missing in the body!');
          done();
        });
    });
    it('Should return 400 for entering a wrong type where there should be string', (done) => {
      request(server)
        .post('/api/v1/users/rides')
        .set({ authorization: token })
        .send({
          message: 'Dave travels',
          destination: 112,
          departurelocation: 'MMA 2 terminal',
          date: '27-07-2018'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('destination must be a string value!');
          done();
        });
    });
    it('Should return status 201 when ride offer is created', (done) => {
      request(server)
        .post('/api/v1/users/rides')
        .set({ authorization: token })
        .send({
          message: 'Dave travels',
          destination: 'Los Angeles',
          departurelocation: 'MMA 2 terminal',
          date: '27-07-2018'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Your ride offer is created successfully');
          done();
        });
    });
    it('Should return status 409 when ride offer exists', (done) => {
      request(server)
        .post('/api/v1/users/rides')
        .set({ authorization: token })
        .send({
          message: 'Dave travels',
          destination: 'Los Angeles',
          departurelocation: 'MMA 2 terminal',
          date: '27-07-2018'
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You have created this ride before');
          done();
        });
    });
  });

  describe('Get all ride offers route', () => {
    // Returns result after searching for offers by destination
    it('Should return 200 if ride offers are in the app', (done) => {
      request(server)
        .get('/api/v1/rides')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('These are the ride offers we have');
          done();
        });
    });
  });

  describe('Get one ride offer route', () => {
    it('Should return 400 if an invalid ID is entered in the parameter', (done) => {
      request(server)
        .get('/api/v1/rides/a')
        .set({ authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You passed an invalid ID');
          done();
        });
    });
    it('Should return 200 if ride offer was found', (done) => {
      request(server)
        .get('/api/v1/rides/1')
        .set({ authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Ride offer delivered');
          done();
        });
    });
    it('Should return 404 if ride offer was not found', (done) => {
      request(server)
        .get('/api/v1/rides/7')
        .set({ authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Ride Offer not found!');
          done();
        });
    });
  });
});
