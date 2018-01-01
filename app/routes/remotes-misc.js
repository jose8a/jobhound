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
let fetchWFHSofJobs = require("../parsers/remote/wfh-sof");
// --- let fetchWFHAllJobs = require("../parsers/remote/wfh-all");
let fetchSOVJSJobs = require("../parsers/remote/sov-rem");
let fetchGHRemoteJobs = require("../parsers/remote/ghub-rem");
let fetchJSPJobs = require("../parsers/remote/jsp");

module.exports = function(router) {
  // get a collection of all my available remote jobs from all sources
  router.get('/', (req, res, next) => {
    console.log("ALL NON-CL REMOTE JOBS - path: '/remote/'");
    res.status(200).json({jobs: {sov: "tbd", wwr: "tbd", wfh: "tbd", ghub: "tbd", spresso: "tbd"}});
  });

  // get list of all available tech sources
  router.get('/list', (req, res, next) => {
    console.log("ALL NON-CL REMOTE SOURCES - path: '/remote/list'");
    res.status(200).json({sources: ['sov-js', 'wwr-cust', 'wwr-prog', 'wfh-all', 'wfh-sof', 'gh-rem', 'jsp']});
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

  // get list of all remote Software jobs available on WFH
  router.get('/wfh-sof', (req, res, next) => {
    console.log("WFH Jobs - path: '/remote/wfh-sof'");
    fetchWFHSofJobs(req, res);
  });

  // get list of all remote jobs available on WFH
  router.get('/wfh-all', (req, res, next) => {
    console.log("WFH Jobs - path: '/remote/wfh-all'");
    res.status(204).end();
    // --- fetchWFHAllJobs(req, res);
  });

  // get list of all remote jobs available on Github
  router.get('/gh-rem', (req, res, next) => {
    console.log("Github Remote Jobs - path: '/remote/gh-rem'");
    fetchGHRemoteJobs(req, res);
  });

  // get list of all remote jobs available on Jobspresso
  router.get('/jsp', (req, res, next) => {
    console.log("Jobspresso Jobs - path: '/remote/jsp'");
    fetchJSPJobs(req, res);
  });
};
