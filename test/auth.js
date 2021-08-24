const App = require('../app');
const chai = require('chai');
let chaiHttp = require('chai-http');

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
    it("Invalid email and password credentials", (done) => {
      chai.request(App.server)
        .post('/auth/login')
        .type("form")
        .send({
          "email": "test@test.com",
          "password": "test123",
        })
        .end((err, response) => {
          response.should.have.status(401);
          response.body.should.be.a('object');
          done();
        });
    });
  });
});
