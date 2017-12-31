// =================================================================
// '/remote/'             -- Returns all remote jobs available from all tech sources
// '/remote/list'         -- Returns a list of the available tech news sources available via the API
// '/remote/wwr-prog'     -- Returns all the job listings from WWR 'Programmer' category page
// '/remote/wwr-cust'     -- Returns all the job listings from WWR 'Customer Support' category page
// '/remote/wfh'          -- Returns all the job listings from WFH
// '/remote/sov'          -- Returns all the job listings from Stack Overflow remotes
// '/remote/ghub'         -- Returns all the job listings from Github remote listings
// '/remote/spresso'      -- Returns all the job listings from Jobspresso
//
// =================================================================
let fetchWWRProgJobs = require("../parsers/remote/wwr-prog");
let fetchWWRCustJobs = require("../parsers/remote/wwr-cust");
// --- let fetchWFHJobs = require("../parsers/remote/wfh");
let fetchSOVJSJobs = require("../parsers/remote/sov-rem");
let fetchGHRemoteJobs = require("../parsers/remote/ghub-rem");
// --- let fetchSpressoJobs = require("../parsers/remote/spresso");

module.exports = function(router) {
  // get a collection of all my available remote jobs from all sources
  router.get('/', (req, res, next) => {
    console.log("ALL NON-CL REMOTE JOBS - path: '/remote/'");
    res.status(200).json({jobs: {sov: "tbd", wwr: "tbd", wfh: "tbd", ghub: "tbd", spresso: "tbd"}});
  });

  // get list of all available tech sources
  router.get('/list', (req, res, next) => {
    console.log("ALL NON-CL REMOTE SOURCES - path: '/remote/list'");
    res.status(200).json({sources: ['sov-js', 'wwr-cust', 'wwr-prog', 'wfh', 'gh-rem', 'spresso']});
  });

  // get list of all remote javascript jobs available on Stack Overflow
  router.get('/sov-js', (req, res, next) => {
    console.log("Stack Overflow Jobs - path: '/remote/sov-js'");
    fetchSOVJSJobs(req, res);
  });

  // get list of all remote programming-jobs available on WWR
  router.get('/wwr-prog', (req, res, next) => {
    console.log("WWR Jobs- path: '/remote/wwr-prog'");
    fetchWWRProgJobs(req, res);
  });

  // get list of all remote customer-support-jobs available on WWR
  router.get('/wwr-cust', (req, res, next) => {
    console.log("WWR Jobs- path: '/remote/wwr-cust'");
    fetchWWRCustJobs(req, res);
  });

  // get list of all remote jobs available on WFH
  router.get('/wfh', (req, res, next) => {
    console.log("WFH Jobs - path: '/remote/wfh'");
    res.status(200).send('TODO: Endpoint remote/wfh not yet implemented');
    // --- fetchWFHJobs(req, res);
  });

  // get list of all remote jobs available on Github
  router.get('/gh-rem', (req, res, next) => {
    console.log("Github Remote Jobs - path: '/remote/gh-rem'");
    fetchGHRemoteJobs(req, res);
  });

  // get list of all remote jobs available on Jobspresso
  router.get('/spresso', (req, res, next) => {
    console.log("Jobspresso Jobs - path: '/remote/spresso'");
    res.status(200).send('TODO: Endpoint remote/spresso not yet implemented');
    // --- fetchSpressoJobs(req, res);
  });
};
