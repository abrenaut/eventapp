/*
* To create the test DB : docker run --name events_mongo -d -p 27017:27017 mongo
*/
var mongoose = require('mongoose');
var sinon = require('sinon');
var Event = require('../src/models/event');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var assert = chai.assert;

chai.use(chaiHttp);

var createdEvent;
var emit = sinon.spy();

describe('Events', () => {
  before((done) => {
    sinon.stub(server.get('socket'), 'emit').callsFake(emit);
    Event.remove({}, (err) => {
     done();
   });     
  });

  describe('/POST events', () => {
    it('it should create an event', (done) => {
      var event = {
        type: "A type",
        serviceId: "serviceId",
        data: "data"
      } 
      chai.request(server)
      .post('/events')
      .send(event)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.type.should.be.eql('A type');
        assert(emit.calledOnce);
        createdEvent = res.body._id;
        done();
      });
    });
  });

  describe('/GET events', () => {
    it('it should get all the events', (done) => {
      chai.request(server)
      .get('/events')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
    });
  });

  describe('/DELETE events', () => {
    it('it should delete the created event', (done) => {
      chai.request(server)
      .delete('/events/' + createdEvent)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.be.eql('Event successfully deleted');
        assert(emit.calledTwice);
        done();
      });
    });
  });
});
