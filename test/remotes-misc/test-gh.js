let should = require('chai').should();
let expect = require('chai').expect;

function testGH(api) {
  describe('GHub Remote listings', function(done) {
    let baseRoute = '/remote'
    let ghubListings = baseRoute + '/gh-rem';

    it('should get Remote listings', function(done) {
      api.get(ghubListings)
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

module.exports = testGH;
