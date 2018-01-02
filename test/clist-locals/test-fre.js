let should = require('chai').should();
let expect = require('chai').expect;

function testFRE(api) {
  describe('FRE Remote listings', function(done) {
    let baseRoute = '/clist-local'
    let engListings = baseRoute + '/fre-eng';
    let sofListings = baseRoute + '/fre-sof';
    let webListings = baseRoute + '/fre-web';

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

module.exports = testFRE;
