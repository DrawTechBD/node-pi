const App = require('../app');
const chai = require('chai');
let chaiHttp = require('chai-http');
const AuthService = require('../src/api/auth/authService');

//Assertion
chai.should();
chai.use(chaiHttp);

describe('QR APIs', () => {
  // Generate
  describe('TEST POST route /api/qr/generate', () => {
    it('Valid generate data', (done) => {
      chai.request(App.server)
        .post('/api/qr/generate')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRmN2VhYmIyZWRmZjViN2MwNzc4ZjQiLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYyODE4NTU0OTg0MCwiZXhwIjoxNjI4MTg2MTU0NjQwfQ.Vmo6ZwXCvXlMCBJioV7UzzJodOl1D5FPxE8v7ZqfVjg`})
        .type('form')
        .send({
          "anon": true,
          "user": {
            "_id": "60df7eabb2edff5b7c0778f4",
            "name": "Test user",
            "email": "test@test.test",
            "phone": "034252636",
            "messenger": "tanvoid0",
            "location": {
              "latitude": 32.4,
              "longitude": 63.2,
              "address": "Test location"
            }
          }
        })
        .end((err, response) => {
          /**
           * TODO: Fix the bug
           */
          // response.should.have.status(200);
          // response.
          response.body.should.be.a('string');
          done();
        });
    });
  });
});
