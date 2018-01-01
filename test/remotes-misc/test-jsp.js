let should = require('chai').should();
let expect = require('chai').expect;

function testJSP(api) {
  describe('JSP Remote listings', function(done) {
    let baseRoute = '/remote'
    let jspListings = baseRoute + '/jsp';

    it('should get Programming listings', function(done) {
      this.timeout(5000);
      api.get(jspListings)
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

module.exports = testJSP;
