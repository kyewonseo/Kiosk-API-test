var assert = require('assert')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect;
var assert = chai.assert;
var config = require('./config')
var should = chai.should()

chai.use(chaiHttp);

describe('Category', function() {
  describe(config.api.categoryListMenu, function() {
    var body = {
      "store_id": config.testEnv.store_id
    }
    var response = {}
    it('http status 200 check', function(done) {
        chai.request(config.server.BASE_PATH)
        .post(config.api.categoryListMenu)
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
    it('data.sub_category_id', function(done) {
      response.body.data[0].should.have.property('sub_category_id').not.to.be.empty
      done();
    });
    it('data.sub_category_name', function(done) {
      response.body.data[0].should.have.property('sub_category_name').not.to.be.empty
      done();
    });
  });
});
