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
    it('http status 200 check', function (done) {
      chai.request(config.server.BASE_PATH)
          .post(config.api.orderAdd)
          .set('content-type', 'application/json')
          .send(body)
          .end((err, res) => {
            res.should.have.status(200)
            response = res
            config.testEnv.order_id = response.body.data.order_id
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
    it('data.order_id', function(done) {
      response.body.data.should.have.property('order_id').not.to.be.empty
      done();
    });
  });

  describe(config.api.orderPaymentList, function () {
    var body3 = {
      "store_id": config.testEnv.store_id,
      "user_id": config.testEnv.user_id
    };
    var response = {};
    //Payment List
    it('http status 200 check', function(done) {
      chai.request(config.server.BASE_PATH)
          .post(config.api.orderPaymentList)
          .set('content-type', 'application/json')
          .send(body3)
          .end((err, res) => {
            res.should.have.status(200)
            response = res
            //console.log(res.body)
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
      console.log(response.body.data)
      response.body.should.have.property('data').not.to.be.empty
      done();
    });
    it('data.order_id', function(done) {
      response.body.data.should.have.property('order_id').not.to.be.empty
      done();
    });
    it('data.order_num', function(done) {
      response.body.data.should.have.property('order_num').not.to.be.empty
      done();
    });
    it('data.amount', function(done) {
      response.body.data.should.have.property('amount').not.to.be.empty
      done();
    });
    it('data.price', function(done) {
      response.body.data.should.have.property('price').not.to.be.empty
      done();
    });
    it('data.tax', function(done) {
      response.body.data.should.have.property('tax').not.to.be.empty
      done();
    });
    it('data.add_points', function(done) {
      response.body.data.should.have.property('add_points').not.to.be.empty
      done();
    });
    it('data.order_status', function(done) {
      response.body.data.should.have.property('order_status').not.to.be.empty
      done();
    });
    it('data.cook_status', function(done) {
      response.body.data.should.have.property('cook_status').not.to.be.empty
      done();
    });
    it('data.points', function(done) {
      response.body.data.should.have.property('points').not.to.be.empty
      done();
    });
    it('data.regidate', function(done) {
      response.body.data.should.have.property('regidate').not.to.be.empty
      done();
    });
    it('data.detail check', function(done) {
      console.log(JSON.stringify(response.body.data[0].detail));
      response.body.data.should.have.property('detail').not.to.be.empty
      done();
    });
    it('data.detail.order_detail_id', function(done) {
      response.body.data.detail.should.have.property('detail.order_detail_id').not.to.be.empty
      done();
    });
    it('data.detail.detail_menu_id', function(done) {
      response.body.data.detail.should.have.property('detail.detail_menu_id').not.to.be.empty
      done();
    });
    it('data.detail.detail_quantity', function(done) {
      response.body.data.detail.should.have.property('detail.detail_quantity').not.to.be.empty
      done();
    });
    it('data.detail.detail_file_id', function(done) {
      response.body.data.detail.should.have.property('detail.detail_file_id').not.to.be.empty
      done();
    });
  });

  describe(config.api.orderPaymentComplete, function () {
    //Payment Complete
    it('http status 200 check', function(done) {
      body2 = {
        "store_id": config.testEnv.store_id,
        "user_id": config.testEnv.user_id,
        "order_id": config.testEnv.order_id,
        "price": config.testEnv.price,
        "tax": config.testEnv.tax
      }

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
    it('data.order_num', function(done) {
      response.body.data.should.have.property('order_num').not.to.be.NaN
      done();
    });
  })

});
