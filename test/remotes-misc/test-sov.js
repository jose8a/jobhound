let should = require('chai').should();
let expect = require('chai').expect;

function testSOV(api) {
  describe('SOV-JS Remote listings', function(done) {
    let baseRoute = '/remote'
    let jsListings = baseRoute + '/sov-js';

    it('should get Remote JS listings', function(done) {
      api.get(jsListings)
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

module.exports = testSOV;
