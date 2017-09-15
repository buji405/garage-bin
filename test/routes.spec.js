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
          console.log(res.body);
          res.status.should.equal(200);
          res.should.be.json;
          res.body.length.should.equal(3);
          res.body[1].should.have.property('name')
          res.body[1].name.should.equal('shovel')
          res.body[1].should.have.property('reason')
          res.body[1].reason.should.equal('for diggin things')
          res.body[1].should.have.property('cleanliness')
          res.body[1].cleanliness.should.equal('dusty')
          
          res.body[2].should.have.property('name')
          res.body[2].name.should.equal('old rug')
          res.body[2].should.have.property('reason')
          res.body[2].reason.should.equal('stains on it')
          res.body[2].should.have.property('cleanliness')
          res.body[2].cleanliness.should.equal('rancid')
          
          done();
        });
    });
  });
  
})
