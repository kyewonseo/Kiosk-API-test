var assert = require('assert')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect;
var assert = chai.assert;
var config = require('./config')
var should = chai.should()

chai.use(chaiHttp);

describe('Store', function() {
  describe(config.api.storeAccountList, function() {
    var body = {
      "account_id": config.testEnv.account_id,
      "admin_id": config.testEnv.admin_id
    }
    var response = {}
    it('http status 200 check', function(done) {
        chai.request(config.server.BASE_PATH)
        .post(config.api.storeAccountList)
            .set('content-type', 'application/json')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200)
                response = res
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
    it('data.store_id', function(done) {
      console.log('store_id=' + response.body.data[0].store_id)
      response.body.data[0].should.have.property('store_id').not.to.be.empty
      done();
    });
    it('data.user_id', function(done) {
      console.log(response.body.data[0].user_id)
      response.body.data[0].should.have.property('user_id').not.to.be.empty
      done();
    });
    it('data.s_phone', function(done) {
      response.body.data[0].should.have.property('s_phone').not.to.be.empty
      done();
    });
    it('data.store', function(done) {
      response.body.data[0].should.have.property('store').not.to.be.empty
      done();
    });
    it('data.u_level', function(done) {
      response.body.data[0].should.have.property('u_level').not.to.be.NaN
      done();
    });
    it('data.u_status', function(done) {
      response.body.data[0].should.have.property('u_status').not.to.be.NaN
      done();
    });
    it('data.u_points', function(done) {
      response.body.data[0].should.have.property('u_points').not.to.be.NaN
      done();
    });
    it('data.s_address', function(done) {
      response.body.data[0].should.have.property('store').not.to.be.empty
      done();
    });
    it('data.s_logo', function(done) {
      console.log('s_logo=' + response.body.data[0].s_logo)
      response.body.data[0].should.have.property('s_logo').not.to.be.empty
      done();
    });
  });
});
