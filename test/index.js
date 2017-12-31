let should = require('chai').should();
let expect = require('chai').expect;
let supertest = require('supertest');

let testCLRemotesLA = require('./clist-remotes/test-la');
let testCLRemotesOC = require('./clist-remotes/test-oc');
let testCLRemotesSD = require('./clist-remotes/test-sd');
let testCLRemotesSAC = require('./clist-remotes/test-sac');
let testCLRemotesSFBAY = require('./clist-remotes/test-sfbay');

let api = supertest('http://localhost:4500');

describe('Home', function() {
  it('should say Hello, World!', function(done) {
    api.get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end( function(err, res) {
        expect(res.body.message).to.equal('Hello, World!');
        done();
      });
  });
});

testCLRemotesLA(api);
testCLRemotesOC(api);
testCLRemotesSD(api);
testCLRemotesSAC(api);
testCLRemotesSFBAY(api);