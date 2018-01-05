let should = require('chai').should();
let expect = require('chai').expect;

function testVue(api) {
  describe('Vue listings', function(done) {
    let baseRoute = '/remote'
    let vueListings = baseRoute + '/vue';

    it('should get Remote listings', function(done) {
      this.timeout(5000);
      api.get(vueListings)
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

module.exports = testVue;
