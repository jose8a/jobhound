let should = require('chai').should();
let expect = require('chai').expect;

function testAuth(api) {
  describe('Auth listings', function(done) {
    let baseRoute = '/remote'
    let authListings = baseRoute + '/auth';

    it('should get Remote listings', function(done) {
      this.timeout(5000);
      api.get(authListings)
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

module.exports = testAuth;
