const App = require('../app');
const chai = require('chai');
let chaiHttp = require('chai-http');

// Assertion
chai.should();
chai.use(chaiHttp);

describe('Portfolio API', () => {
  // Portfolio
  describe('Test GET route /api/portfolio', () => {
    // valid response
    it('Valid Response', (done) => {
      chai.request(App.server)
        .get('/api/portfolio')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
  });
});