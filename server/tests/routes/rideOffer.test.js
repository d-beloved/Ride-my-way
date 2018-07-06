// import { expect } from 'chai';
// import request from 'supertest';
// import server from '../../app';

// describe('The Ride Offer routes', () => {
//   describe('Register a ride offer route', () => {
//     // Registers a ride offer
//     it('Should return 400 for missing required fields', (done) => {
//       request(server)
//         .post('/api/v1/rides')
//         .send({
//           title: 'Dave travels',
//           driverName: 'Gulliver',
//           destination: 'Los Angeles',
//           depart: 'MMA 2 terminal',
//           date: '',
//           fee: 300000
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('date cannot be missing in the body!');
//           done();
//         });
//     });
//     it('Should return 409 if ride offer exists already', (done) => {
//       request(server)
//         .post('/api/v1/rides')
//         .send({
//           title: 'Dave travels',
//           driverName: 'GUO transport',
//           destination: 'Abuja, Lagoon',
//           depart: 'MMA 2 terminal',
//           date: '2018-07-25',
//           fee: 300000
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(409);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('A Ride Offer with same driver Name and destination is found!');
//           done();
//         });
//     });
//     it('Should return 406 if an invalid date is entered', (done) => {
//       request(server)
//         .post('/api/v1/rides')
//         .send({
//           title: 'Dave travels',
//           driverName: 'Gulliver',
//           destination: 'Los Angeles',
//           depart: 'MMA 2 terminal',
//           date: '2018-06-20',
//           fee: 300000
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(406);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Please enter a valid future date in this format (YYYY-MM-DD)');
//           done();
//         });
//     });
//     it('Should return status 400 if a non integer is entered as fee', (done) => {
//       request(server)
//         .post('/api/v1/rides')
//         .send({
//           title: 'Dave travels',
//           driverName: 'Gulliver',
//           destination: 'Los Angeles',
//           depart: 'MMA 2 terminal',
//           date: '2018-07-25',
//           fee: '300000'
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Please enter a valid amount for the ride');
//           done();
//         });
//     });
//     it('Should return status 201 when ride offer is created', (done) => {
//       request(server)
//         .post('/api/v1/rides')
//         .send({
//           title: 'Dave travels',
//           driverName: 'Gulliver',
//           destination: 'Los Angeles',
//           depart: 'MMA 2 terminal',
//           date: '2018-07-25',
//           fee: 300000
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(201);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Ride offer created successfully');
//           done();
//         });
//     });
//   });

//   describe('Get all ride offers route', () => {
//     // Returns result after searching for offers by destination
//     it('Should return 404 if there is no ride with the queried destination', (done) => {
//       request(server)
//         .get('/api/v1/rides?destination=Dapchi')
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('There is no Ride offer with the specified destination');
//           done();
//         });
//     });
//     it('Should return 200 if rides to the queried destination is found', (done) => {
//       request(server)
//         .get('/api/v1/rides?destination=lagos')
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           done();
//         });
//     });
//     it('Should return 200 if ride offers were found or not found', (done) => {
//       request(server)
//         .get('/api/v1/rides')
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           expect(res.body).to.be.an('object');
//           done();
//         });
//     });
//   });

//   describe('Get one ride offer route', () => {
//     it('Should return 200 if ride offer was found', (done) => {
//       request(server)
//         .get('/api/v1/rides/1')
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           expect(res.body).to.be.an('object');
//           done();
//         });
//     });
//     it('Should return 404 if ride offer was not found', (done) => {
//       request(server)
//         .get('/api/v1/rides/0')
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Ride Offer not found!');
//           done();
//         });
//     });
//   });

//   describe('Delete a ride offer', () => {
//     /* Delete a Ride offer */
//     it('Should return 404 if ride offer not found', (done) => {
//       request(server)
//         .delete('/api/v1/rides/0')
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Ride Offer not found or deleted already');
//           done();
//         });
//     });
//     it('Should return 200 if Ride offer was deleted successfully', (done) => {
//       request(server)
//         .delete('/api/v1/rides/2')
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Ride Offer deleted successfully');
//           done();
//         });
//     });
//   });

//   describe('Modify a Ride offer', () => {
//     /* Modify a ride offer */
//     it('Should return 404 if ride offer not found', (done) => {
//       request(server)
//         .put('/api/v1/rides/0')
//         .send({
//           title: 'Dave travels',
//           driverName: 'Gullion',
//           destination: 'Los Angeles',
//           depart: 'MMA 2 terminal',
//           date: '2018-07-27',
//           fee: '300000'
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Ride Offer not found!');
//           done();
//         });
//     });
//     it('Should return 200 if ride offer was edited successfully', (done) => {
//       request(server)
//         .put('/api/v1/rides/3')
//         .send({
//           title: 'Dave travels',
//           driverName: 'Gullion',
//           destination: 'Los Angeles',
//           depart: 'MMA 2 terminal',
//           date: '2018-07-27',
//           fee: '300000'
//         })
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body.message).to.equal('Ride Offer updated successfully!');
//           done();
//         });
//     });
//   });
// });
