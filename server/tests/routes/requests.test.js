import jwt from 'jsonwebtoken';
import request from 'supertest';
import { expect } from 'chai';
import server from '../../app';

const wrongtoken = 'wrong secret';
const authToken1 = jwt.sign({ userid: 1 }, process.env.JWT_SECRET);
const authToken2 = jwt.sign({ userid: 2 }, process.env.JWT_SECRET);
const token1 = `Bearer ${authToken1}`;
const token2 = `Bearer ${authToken2}`;

describe('The request for ride routes', () => {
  describe('Request for a ride offer', () => {
    it('Should return 400 if an invalid ID is entered in the parameter', (done) => {
      request(server)
        .post('/api/v1/rides/a/requests')
        .set({ authorization: token1 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You passed an invalid ID');
          done();
        });
    });
    it('Should return 401 for an empty token', (done) => {
      request(server)
        .post('/api/v1/rides/1/requests')
        .set({ authorization: '' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('token is required!');
          done();
        });
    });
    it('Should return 401 for a wrong token', (done) => {
      request(server)
        .post('/api/v1/rides/1/requests')
        .set({ authorization: wrongtoken })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Authentication failed! Token is Invalid or expired. Please Login again');
          done();
        });
    });
    it('Should return 404 if ride offer is not found', (done) => {
      request(server)
        .post('/api/v1/rides/2/requests')
        .set({ authorization: token2 })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('The ride Offer is not found!');
          done();
        });
    });
    it('Should return 406 if ride offer is requested by its creator', (done) => {
      request(server)
        .post('/api/v1/rides/1/requests')
        .set({ authorization: token1 })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You cannot request for your ride, calm down');
          done();
        });
    });
    it('Should return 201 if the request for a ride was successful', (done) => {
      request(server)
        .post('/api/v1/rides/1/requests')
        .set({ authorization: token2 })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Your request for this ride is registered, Pending for acceptance. Thanks a lot!');
          done();
        });
    });
    it('Should return 409 if request for same ride already exist from same user', (done) => {
      request(server)
        .post('/api/v1/rides/1/requests')
        .set({ authorization: token2 })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You have requested for this ride before, be patient for the reply by the ride owner');
          done();
        });
    });
  });

  describe('Get all request for a ride offer', () => {
    it('Should return 403 if the user is not the owner of the ride', (done) => {
      request(server)
        .get('/api/v1/users/rides/1/requests')
        .set({ authorization: token2 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You are not allowed to view the requests for this ride');
          done();
        });
    });
    it('Should return 200 if the requests for the ride offer is returned', (done) => {
      request(server)
        .get('/api/v1/users/rides/1/requests')
        .set({ authorization: token1 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Your ride has been requested by:');
          done();
        });
    });
  });

  describe('Accepts or rejects a ride offer', () => {
    it('Should return 400 for missing required fields', (done) => {
      request(server)
        .put('/api/v1/users/rides/1/requests/1')
        .set({ authorization: token1 })
        .send({
          status: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('status cannot be missing in the body!');
          done();
        });
    });
    it('Should return 403 if the ride and/or request is not found or user is not allowed to update the route', (done) => {
      request(server)
        .put('/api/v1/users/rides/1/requests/5')
        .set({ authorization: token2 })
        .send({
          status: 'accepted'
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('The ride and/or request does not exist or you are not allowed to update the status of this request');
          done();
        });
    });
    it('Should return 406 if the new status does not meet the enum criteria', (done) => {
      request(server)
        .put('/api/v1/users/rides/1/requests/1')
        .set({ authorization: token1 })
        .send({
          status: 'Oyacome'
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You are entering a wrong value, it\'s either you enter accepted or rejected');
          done();
        });
    });
    it('Should return 202 if the status is successfully updated', (done) => {
      request(server)
        .put('/api/v1/users/rides/1/requests/1')
        .set({ authorization: token1 })
        .send({
          status: 'Accepted'
        })
        .end((err, res) => {
          expect(res.status).to.equal(202);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('The status of the request has been updated successfully');
          done();
        });
    });
  });
});
