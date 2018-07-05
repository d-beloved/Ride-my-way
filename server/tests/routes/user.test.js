import jwt from 'jsonwebtoken';
import request from 'supertest';
import { expect } from 'chai';
import server from '../../app';

const authToken = jwt.sign({ userid: 3 }, process.env.JWT_SECRET);
const nonsenseToken = 'wrongToken';

describe('The User route', () => {
  describe('The Signup route', () => {
    it('Should return 400 for missing required fields', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Morayo',
          lastname: 'Daniel',
          phoneno: 7065349529,
          username: ' ',
          email: 'mountainview@gmail.com',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('username cannot be missing in the body!');
          done();
        });
    });
    it('Should return 400 for incorrect string entering', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Morayo',
          lastname: 'Daniel',
          phoneno: 7065349529,
          username: 12345,
          email: 'mountainview@gmail.com',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Check your input and try again pls, you might be entering a wrong input or this user already exists');
          done();
        });
    });
    it('Should return 406 for a wrong input format', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Morayo',
          lastname: 'Daniel',
          phoneno: 7065349529,
          username: '12345',
          email: 'mountainview@gmail.come',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Please enter a valid email');
          done();
        });
    });
    it('Should return 406 for a short password', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Morayo',
          lastname: 'Daniel',
          phoneno: 7065349529,
          username: '12345',
          email: 'mountainview@gmail.com',
          password: '12345'
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('The password is too short! - make sure it is at least 6 characters long');
          done();
        });
    });
    it('Should return 400 for a wrong phoneno input', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Morayo',
          lastname: 'Daniel',
          phoneno: 706534952,
          username: '12345',
          email: 'mountainview@gmail.com',
          password: '123456'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Check your input and try again pls, you might be entering a wrong input or this user already exists');
          done();
        });
    });
    it('Should return 400 for any other wrong input', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Morayo',
          lastname: 'Daniel',
          phoneno: 706534952,
          username: '12345',
          email: 'morayodeji@gmail.com',
          password: '123456'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Check your input and try again pls, you might be entering a wrong input or this user already exists');
          done();
        });
    });
    it('Should return 201 for successfully creating user', (done) => {
      request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Morayo',
          lastname: 'Daniel',
          username: 'Godisgood',
          phoneno: 7053495259,
          email: 'morayji@gmail.com',
          password: '1234556'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User created successfully');
          done();
        });
    });
  });

  describe('The Login route', () => {
    it('Should return 400 for missing required fields', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: ' ',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('email cannot be missing in the body!');
          done();
        });
    });
    it('Should return 400 for incorrect string entering', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'mountainview@gmail.com',
          password: 1234567
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('An error occured');
          done();
        });
    });
    it('Should return 406 for a wrong input format', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'mountainview@gmail.come',
          password: '1234567'
        })
        .end((err, res) => {
          expect(res.status).to.equal(406);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Please enter a valid email');
          done();
        });
    });
    it('Should return 200 if user is already logged in', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          Authorization: authToken,
          email: 'morayji@gmail.com',
          password: '1234556'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You are logged in!');
          done();
        });
    });
    it('Should return 401 if token is invalid', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          Authorization: nonsenseToken,
          email: 'morayji@gmail.com',
          password: '1234556'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Token is invalid or has expired, Please re-login');
          done();
        });
    });
    it('Should return 401 if the password is wrong', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'morayji@gmail.com',
          password: '123456'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('wrong password!');
          done();
        });
    });
    it('Should return 404 if the user doen\'t exist', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'morji@gmail.com',
          password: '123456'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User not registered or wrong email');
          done();
        });
    });
    it('Should return 200 for successful login', (done) => {
      request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'morayji@gmail.com',
          password: '1234556'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You are logged in!');
          done();
        });
    });
  });
});
