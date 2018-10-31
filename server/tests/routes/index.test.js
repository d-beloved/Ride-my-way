import request from 'supertest';
import { expect } from 'chai';
import server from '../../app';

describe('GET: / Tests for index or unregistered routes', () => {
  it('should return status code 404 when user visit an unregistered route', (done) => {
    request(server)
      .get('/api/v1/anyUnregisteredRoute')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('You are hitting a wrong route, find the valid routes below');
        done();
      });
  });
});
