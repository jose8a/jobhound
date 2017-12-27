// =================================================================
// '/clist-local/'            -- Returns all remote jobs available from all tech sources
// '/clist-local/list'        -- Returns a list of the available tech news sources available via the API
// '/clist-local/bak-eng'     -- Returns all the job listings from WWR 'Programmer' category page
// '/clist-local/bak-sof'     -- Returns all the job listings from WWR 'Customer Support' category page
// '/clist-local/bak-web'     -- Returns all the job listings from WFH
// '/clist-local/fre-eng'     -- Returns all the job listings from Stack Overflow remotes
// '/clist-local/fre-sof'     -- Returns all the job listings from Github remote listings
// '/clist-local/fre-web'     -- Returns all the job listings from Jobspresso
//
// =================================================================
let fetchBakEngJobs = require("../parsers/remote/clist-bak-eng");
let fetchBakSofJobs = require("../parsers/remote/clist-bak-sof");
let fetchBakWebJobs = require("../parsers/remote/clist-bak-web");
// --- let fetchFreEngJobs = require("../parsers/clist-local/clist-fre-eng");
// --- let fetchFreSofJobs = require("../parsers/clist-local/clist-fre-sof");
// --- let fetchFreWebJobs = require("../parsers/clist-local/clist-fre-web");

module.exports = function(router) {
  // get a collection of all my available remote jobs from all sources
  router.get('/', (req, res, next) => {
    console.log("ALL CENTRAL VALLEY CL-LOCAL JOBS - path: '/clist-local/'");
    res.status(200).json({jobs: {bakEng: "tbd", bakSof: "tbd", bakWeb: "tbd", freEng: "tbd", freSof: "tbd", freWeb: "tbd"}});
  });

  // get list of all available tech sources
  router.get('/list', (req, res, next) => {
    console.log("ALL CENTRAL VALLEY CL-LOCAL SOURCES - path: '/clist-local/list'");
    res.status(200).json({sources: ['bak-eng', 'bak-sof', 'bak-web', 'fre-eng', 'fre-sof', 'fre-web']});
  });

  // get list of all Bakersfield engineering jobs available on CList
  router.get('/bak-eng', (req, res, next) => {
    console.log("CList Bakersfield Eng Jobs - path: '/clist-local/bak-eng'");
    fetchBakEngJobs(req, res);
  });

  // get list of all Bakersfield software jobs available on CList
  router.get('/bak-sof', (req, res, next) => {
    console.log("CList Bakersfield SW Jobs - path: '/clist-local/bak-sof'");
    fetchBakSofJobs(req, res);
  });

  // get list of all Bakersfield webdev jobs available on CList
  router.get('/bak-web', (req, res, next) => {
    console.log("CList Bakersfield Web Jobs - path: '/clist-local/bak-web'");
    fetchBakWebJobs(req, res);
  });

  // get list of all Fresno engineering jobs available on CList
  router.get('/fre-eng', (req, res, next) => {
    console.log("CList Fresno Eng Jobs - path: '/clist-local/fre-eng'");
    res.status(200).send('TODO: Endpoint clist-local/fre-eng not yet implemented');
    // --- fetchFreEngJobs(req, res);
  });

  // get list of all Fresno software jobs available on CList
  router.get('/fre-sof', (req, res, next) => {
    console.log("CList Fresno SW Jobs - path: '/clist-local/fre-sof'");
    res.status(200).send('TODO: Endpoint clist-local/fre-sof not yet implemented');
    // --- fetchFreSofJobs(req, res);
  });

  // get list of all Fresno webdev jobs available on CList
  router.get('/fre-web', (req, res, next) => {
    console.log("CList Fresno Web Jobs - path: '/clist-local/fre-web'");
    res.status(200).send('TODO: Endpoint clist-local/fre-web not yet implemented');
    // --- fetchFreWebJobs(req, res);
  });

};
