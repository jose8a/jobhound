let should = require('chai').should();
let expect = require('chai').expect;

function testSD(api) {
  describe('SD Remote listings', function(done) {
    let baseRoute = '/clist-remote'
    let engListings = baseRoute + '/sd-eng';
    let sofListings = baseRoute + '/sd-sof';
    let webListings = baseRoute + '/sd-web';

    it('should get Internet Engineering listings', function(done) {
      api.get(engListings)
        .set('Accept', 'application/json')
        .expect(200)
        .end( function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.be.at.least(1);
          done();
        });
    });

    it('should get Software listings', function(done) {
      api.get(sofListings)
        .set('Accept', 'application/json')
        .expect(200)
        .end( function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.be.at.least(1);
          done();
        });
    });

    it('should get Web Design listings', function(done) {
      api.get(webListings)
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

module.exports = testSD;
