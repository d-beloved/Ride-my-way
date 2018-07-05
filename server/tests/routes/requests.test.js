import { expect } from 'chai';
import request from 'supertest';
import server from '../../app';

describe('The request for ride routes', () => {
  describe('Request for a ride offer', () => {
    it('Should return 400 for missing required fields', (done) => {
      request(server)
        .post('/api/v1/rides/1/requests')
        .send({
          requester: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('requester cannot be missing in the body!');
          done();
        });
    });
    it('Should return 404 if ride offer is not found', (done) => {
      request(server)
        .post('/api/v1/rides/0/requests')
        .send({
          requester: 'David Mills'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Ride Offer not found!');
          done();
        });
    });
    it('Should return 201 if the request for a ride was successful', (done) => {
      request(server)
        .post('/api/v1/rides/1/requests')
        .send({
          requester: 'David Mills'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Your request is registered, Pending for acceptance. Thanks a lot!');
          done();
        });
    });
  });

  describe('Get all request for a ride offer', () => {
    it('Should return 404 if the ride offer is not found', (done) => {
      request(server)
        .get('/api/v1/rides/0/requests')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Ride Offer with the specified Id not found!');
          done();
        });
    });
    it('Should return 200 if the requests for the ride offer is returned', (done) => {
      request(server)
        .get('/api/v1/rides/1/requests')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Checks the status of a request for a ride', () => {
    it('Should return 404 if the ride offer is not found', (done) => {
      request(server)
        .get('/api/v1/rides/0/requests/1/status')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('The ride Offer is not found!');
          done();
        });
    });
    it('Should return 404 if the request is not found', (done) => {
      request(server)
        .get('/api/v1/rides/3/requests/0/status')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('The request is not found!');
          done();
        });
    });
    it('Should return 200 if the status of the requests for the ride offer is not found', (done) => {
      request(server)
        .get('/api/v1/rides/3/requests/1/status')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('The status of your request for Offer \'A glide through the Forest savannah\' is pending');
          done();
        });
    });
  });
});
