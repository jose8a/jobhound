let should = require('chai').should();
let expect = require('chai').expect;

function testWFH(api) {
  describe('WFH Remote listings', function(done) {
    let baseRoute = '/remote'
    let wfhSofListings = baseRoute + '/wfh-sof';
    // --- let wfhAllListings = baseRoute + '/wfh-all';

    it('should get Software listings', function(done) {
      this.timeout(5000);
      api.get(wfhSofListings)
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

module.exports = testWFH;
