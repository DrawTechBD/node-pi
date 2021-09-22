const App = require('../app');
const chai = require('chai');
let chaiHttp = require('chai-http');
const UserModel = require('../src/api/user/userModel');

//Assertion
chai.should();
chai.use(chaiHttp);

describe("Auth APIs", () => {
  // Login
  describe("Test POST route /auth/login", () => {
    // Valid Login
    it("Valid login credentials", (done) => {
      chai.request(App.server)
        .post('/auth/login')
        .type("form")
        .send({
          "email": "test@test.test",
          "password": "test123",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });

    // Invalid login
    it("Invalid email and password credentials", (done) => {
      chai.request(App.server)
        .post('/auth/login')
        .type("form")
        .send({
          "email": "test@test.com",
          "password": "test123",
        })
        .end((err, response) => {
          response.should.have.status(500);
          response.body.should.be.a('object');
          done();
        });
    });
  });

  // Authenticate
  describe("Test POST route /auth/authenticate", () => {
    // valid token
    it("Valid token", (done) => {
      chai.request(App.server)
        .post('/auth/authenticate')
        .set({Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRmN2VhYmIyZWRmZjViN2MwNzc4ZjQiLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYyOTg4NzI0OTc0NywiZXhwIjoxNjI5ODg3ODU0NTQ3fQ.kQhsbEgbCcSb9I9nAO1jw89KdKM-INsAyuez2uC650I`})
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });

  })
});
