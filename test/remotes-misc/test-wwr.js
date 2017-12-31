let should = require('chai').should();
let expect = require('chai').expect;

function testWWR(api) {
  describe('WWR Remote listings', function(done) {
    let baseRoute = '/remote'
    let progListings = baseRoute + '/wwr-prog';
    let custListings = baseRoute + '/wwr-cust';

    it('should get Programming listings', function(done) {
      api.get(progListings)
        .set('Accept', 'application/json')
        .expect(200)
        .end( function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.be.at.least(1);
          done();
        });
    });

    it('should get Customer-support listings', function(done) {
      api.get(custListings)
        .set('Accept', 'application/json')
        .expect(200)
        .end( function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.be.at.least(1);
          done();
        });
    });
  });
}

module.exports = testWWR;
