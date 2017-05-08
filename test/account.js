var assert = require('assert')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect;
var assert = chai.assert;
var config = require('./config')
let should = chai.should()

chai.use(chaiHttp);

describe('Login', function() {
  describe(config.api.accountLogin, function() {
    this.timeout(5000);
    var body = {
      "account_id": config.testEnv.account_id,
      "passwd": config.testEnv.passwd
    }
    var response = {}
    it('http status 200 check', function(done) {
        chai.request(config.server.BASE_PATH)
        .post(config.api.accountLogin)
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
      response.body.should.have.property('data').not.to.be.empty
      done();
    });
    it('data.account_id ', function(done) {
      response.body.data[0].should.have.property('account_id').not.to.be.empty
      done();
    });
    it('data.name', function(done) {
      response.body.data[0].should.have.property('name').not.to.be.empty
      done();
    });
    it('data.phone', function(done) {
      response.body.data[0].should.have.property('phone').not.to.be.empty
      done();
    });
    it('data.status', function(done) {
      response.body.data[0].should.have.property('status').not.to.be.NaN
      done();
    });
  });
});
