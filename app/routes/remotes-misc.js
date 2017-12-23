// =================================================================
// '/remote/'             -- Returns all stories available from all tech sources
// '/remote/list'         -- Returns a list of the available tech news sources available via the API
// '/remote/wwr'          -- Returns all the job listings from WWR Programmer category page
// '/remote/wfh'          -- Returns all the job listings from WFH
// '/remote/sov'          -- Returns all the job listings from Stack Overflow remotes
// '/remote/ghub'         -- Returns all the job listings from Github remote listings
// '/remote/spresso'      -- Returns all the job listings from Jobspresso
//
// =================================================================
let fetchWWRProgJobs = require("../parsers/remote/wwr-prog");
// --- let fetchWFHJobs = require("../parsers/remote/wfh");
// --- let fetchSOVJobs = require("../parsers/remote/sov-rem");
// --- let fetchGHubJobs = require("../parsers/remote/ghub-rem");
// --- let fetchSpressoJobs = require("../parsers/remote/spresso");

module.exports = function(router) {
  // get a collection of all my available stories from all sources
  router.get('/', (req, res, next) => {
    console.log("ALL NON-CL REMOTE JOBS - path: '/remote/'");
    res.status(200).json({stories: {sov: "tbd", wwr: "tbd", wfh: "tbd", ghub: "tbd", spresso: "tbd"}});
  });

  // get list of all available tech sources
  router.get('/list', (req, res, next) => {
    console.log("ALL NON-CL REMOTE SOURCES - path: '/remote/list'");
    res.status(200).json({sources: ['sov', 'wwr', 'wfh', 'ghub', 'spresso']});
  });

  // get list of all stories available on FEFront front-page
  router.get('/sov', (req, res, next) => {
    console.log("Stack Overflow Jobs - path: '/remote/sov'");
    res.status(200).send('TODO: Endpoint remote/sov not yet implemented');
    // --- fetchSOVJobs(req, res);
  });

  // get list of all stories available on EchoJS front-page
  router.get('/wwr-prog', (req, res, next) => {
    console.log("WWR Jobs- path: '/remote/wwr'");
    res.status(200).send('TODO: Endpoint remote/wwr-prog not yet implemented');
    // --- fetchWWRProgJobs(req, res);
  });

  // get list of all stories available on CSS Tricks front-page
  router.get('/wfh', (req, res, next) => {
    console.log("WFH Jobs - path: '/remote/wfh'");
    res.status(200).send('TODO: Endpoint remote/wfh not yet implemented');
    // --- fetchWFHJobs(req, res);
  });

  // get list of all stories available on DevTo front-page
  router.get('/ghub', (req, res, next) => {
    console.log("Github Remote Jobs - path: '/remote/ghub'");
    res.status(200).send('TODO: Endpoint remote/ghub not yet implemented');
    // --- fetchGHubJobs(req, res);
  });

  // get list of all stories available on ScotchIO front-page
  router.get('/spresso', (req, res, next) => {
    console.log("Jobspresso Jobs - path: '/remote/spresso'");
    res.status(200).send('TODO: Endpoint remote/spresso not yet implemented');
    // --- fetchSpressoJobs(req, res);
  });
};
