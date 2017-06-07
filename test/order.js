var assert = require('assert')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect;
var assert = chai.assert;
var config = require('./config')
var should = chai.should()

chai.use(chaiHttp);

describe('Order', function() {
  describe(config.api.orderAdd, function() {
    var body = {
      "store_id": config.testEnv.store_id,
      "user_id": config.testEnv.user_id,
      "price": config.testEnv.price,
      "paymethod": config.testEnv.paymethod,
      "tax": config.testEnv.tax,
      "points": config.testEnv.points,
      "detail": [{
        "menu_id": config.testEnv.menu_id,
        "quantity": config.testEnv.quantity,
        "option": [{
          "menu_id": config.testEnv.option_menu_id,
          "quantity": config.testEnv.quantity
        }]
      }]
    }
    var response = {}
    var order_id = "";
    it('http status 200 check', function(done) {
        chai.request(config.server.BASE_PATH)
        .post(config.api.orderAdd)
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200)
                response = res
      config.testEnv.order_id = response.body.data.order_id
      console.log(res.body)
      console.log(config.testEnv.order_id)
      body2 = {
        "store_id": config.testEnv.store_id,
        "user_id": config.testEnv.user_id,
        "order_id": config.testEnv.order_id
      }
      console.log(body2)
                done();
        });
    });
    it('data property existency check', function(done) {
      response.should.have.property('body');
      done();
    });
    it('data null check', function(done) {
      expect(response.body).to.not.be.null;
      done();
    });
    it('responseStatus 200 check', function(done) {
      response.body.should.have.property('responseStatus').eql(200)
      done();
    });
    it('data check', function(done) {
      // console.log(response.body.data)
      response.body.should.have.property('data').not.to.be.empty
      done();
    });
    it('data.order_id', function(done) {
      response.body.data.should.have.property('order_id').not.to.be.empty
      done();
    });


    //Payment Complete
    it('http status 200 check', function(done) {
      chai.request(config.server.BASE_PATH)
          .post(config.api.orderPaymentComplete)
          .set('content-type', 'application/json')
          .send(body2)
          .end((err, res) => {
          res.should.have.status(200)
        response = res
      console.log(body2)
        console.log(res.body)
        done();
      });
    });
    it('data property existency check', function(done) {
      response.should.have.property('body');
      done();
    });
    it('data null check', function(done) {
      expect(response.body).to.not.be.null;
      done();
    });
    it('responseStatus 200 check', function(done) {
      response.body.should.have.property('responseStatus').eql(200)
      done();
    });
    it('data check', function(done) {
      response.body.should.have.property('data').not.to.be.empty
      done();
    });
    it('data.order_id', function(done) {
      response.body.data.should.have.property('order_id').not.to.be.empty
      done();
    });

    var body3 = {
      "store_id": config.testEnv.store_id,
      "user_id": config.testEnv.user_id
    }
    //Payment List
    it('http status 200 check', function(done) {
      chai.request(config.server.BASE_PATH)
        .post(config.api.orderPaymentList)
        .set('content-type', 'application/json')
        .send(body3)
        .end((err, res) => {
        res.should.have.status(200)
      response = res
      config.testEnv.order_id = response.body.data.order_id
      console.log(body2)
      console.log(res.body)
      done();
    });
    });
    it('data property existency check', function(done) {
      response.should.have.property('body');
      done();
    });
    it('data null check', function(done) {
      expect(response.body).to.not.be.null;
      done();
    });
    it('responseStatus 200 check', function(done) {
      response.body.should.have.property('responseStatus').eql(200)
      done();
    });
    it('data check', function(done) {
      // console.log(response.body.data)
      response.body.should.have.property('data').not.to.be.empty
      done();
    });
  });
});
