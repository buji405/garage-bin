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
      .then(() => done())
  });
  
  beforeEach((done) => {
    knex.seed.run()
      .then(() => done())
  });
  
  describe('GET /api/v1/items', () => {
    it('should return all items', (done) => {
      chai.request(server)
        .get('/api/v1/items')
        .end((err, res) => {
          res.status.should.equal(200);
          res.should.be.json;
          res.body.length.should.equal(3);
          res.body[1].should.have.property('name');
          res.body[1].name.should.equal('shovel');
          res.body[1].should.have.property('reason');
          res.body[1].reason.should.equal('for diggin things');
          res.body[1].should.have.property('cleanliness');
          res.body[1].cleanliness.should.equal('dusty');
          
          res.body[2].should.have.property('name');
          res.body[2].name.should.equal('old rug');
          res.body[2].should.have.property('reason');
          res.body[2].reason.should.equal('stains on it');
          res.body[2].should.have.property('cleanliness');
          res.body[2].cleanliness.should.equal('rancid')    ;
          done();
        });
    });
    
    it('should return a 404 error if you go to the wrong endpoint', (done) => {
      chai.request(server)
      .get('/api/v1/itms')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});
  
  describe('POST /api/v1/items', () => {
    it('should post an item', (done) => {
      chai.request(server)
        .post('/api/v1/items')
        .send({
          id: 4,
          name: 'saw',
          reason: 'for sawin logs',
          cleanliness: 'sparkling',
          created_at: '2017-09-15T00:46:21.513Z',
          updated_at: '2017-09-15T00:52:21.513Z'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.id.should.equal(4);
          res.body.should.have.property('name');
          res.body.name.should.equal('saw');
          res.body.should.have.property('reason');
          res.body.reason.should.equal('for sawin logs');
          res.body.should.have.property('cleanliness');
          res.body.cleanliness.should.equal('sparkling');
          
          chai.request(server)
         .get('/api/v1/items')
         .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.should.be.json;
          res.body.length.should.equal(4);
          done();
        });
      });
    });
    
    it('should return an error if required information is missing', () => {
      chai.request(server)
        .post('/api/v1/items')
        .send({
          id: 5,
          name: 'mini-fridge',
          cleanliness: 'rusty',
        })
        .end((err, res) => {
          res.status.should.equal(422);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Missing required reason parameter');
          done();
        });
    });
  });
  
  describe('PUT /api/v1/items', () => {
   it('should update cleanliness of an item', (done) => {
     chai.request(server)
     .get('/api/v1/items')
     .end((err, res) => {
       res.body[0].name.should.equal('tutu');
       res.body[0].cleanliness.should.equal('sparkling');
       
       chai.request(server) 
       .put('/api/v1/items/1')
       .send({
         cleanliness: 'rancid',
       })
       .end((err, res) => {
         res.status.should.equal(201);
         res.body[0].name.should.equal('tutu');
         res.body[0].cleanliness.should.equal('rancid');
         done();
       });
     })
   });
   
   it('should not update an item that does not exist', () => {
     chai.request(server)
     .put('/api/v1/items/8')
     .send({
       cleanliness: 'sparkling',
     })
     .end((err, res) => {
       res.status.should.equal(500);
       res.should.be.json;
       res.body.should.be.a('array');
       done();
       });
     })
   });
});