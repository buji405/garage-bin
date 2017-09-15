const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => done());
  });
  
  beforeEach((done) => {
    knex.seed.run()
      .then(() => done());
  });
  
  describe('GET /api/v1/items', () => {
    it('should return all items', (done) => {
      chai.request(server)
        .get('/api/v1/items')
        .end((err, res) => {
          res.status.should.equal(200);
          res.should.be.json;

          done();
        });
    });
  });
  
})
