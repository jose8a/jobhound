// =================================================================
// '/clist-remote/'           -- Returns all remote jobs available from all tech sources
// '/clist-remote/list'       -- Returns a list of the available tech news sources available via the API
// '/clist-remote/la-eng'     -- Returns ENG CL remote job listings for LA area
// '/clist-remote/oc-eng'     -- Returns ENG CL remote job listings for OC area
// '/clist-remote/sac-eng'    -- Returns ENG CL remote job listings for SAC area
// '/clist-remote/sd-eng'     -- Returns ENG CL remote job listings for SD area
// '/clist-remote/sf-eng'     -- Returns ENG CL remote job listings for SF area
// '/clist-remote/la-sof'     -- Returns SOF CL remote job listings for LA area
// '/clist-remote/oc-sof'     -- Returns SOF CL remote job listings for OC area
// '/clist-remote/sac-sof'    -- Returns SOF CL remote job listings for SAC area
// '/clist-remote/sd-sof'     -- Returns SOF CL remote job listings for SD area
// '/clist-remote/sf-sof'     -- Returns SOF CL remote job listings for SF area
// '/clist-remote/la-web'     -- Returns WEB CL remote job listings for LA area
// '/clist-remote/oc-web'     -- Returns WEB CL remote job listings for OC area
// '/clist-remote/sac-web'    -- Returns WEB CL remote job listings for SAC area
// '/clist-remote/sd-web'     -- Returns WEB CL remote job listings for SD area
// '/clist-remote/sf-web'     -- Returns WEB CL remote job listings for SF area
//
// =================================================================
let fetchCLRemoteLAEngJobs = require("../parsers/remote/clist-rem-la-eng");
let fetchCLRemoteLASofJobs = require("../parsers/remote/clist-rem-la-sof");
let fetchCLRemoteLAWebJobs = require("../parsers/remote/clist-rem-la-web");
let fetchCLRemoteOCEngJobs = require("../parsers/remote/clist-rem-oc-eng");
let fetchCLRemoteOCSofJobs = require("../parsers/remote/clist-rem-oc-sof");
let fetchCLRemoteOCWebJobs = require("../parsers/remote/clist-rem-oc-web");

module.exports = function(router) {
  // get a collection of all my available remote jobs from all sources
  router.get('/', (req, res, next) => {
    console.log("ALL CL-REMOTE JOBS - path: '/clist-remote/'");
    res.status(200).json({jobs: {laEng: "tbd", laSof: "tbd", laWeb: "tbd", ocEng: "tbd", ocSof: "tbd", ocWeb: "tbd"}});
  });

  // get list of all available tech sources
  router.get('/list', (req, res, next) => {
    console.log("ALL CL-REMOTE SOURCES - path: '/clist-remote/list'");
    res.status(200).json({sources: ['la-eng', 'la-sof', 'la-web', 'oc-eng', 'oc-sof', 'oc-web']});
  });

  // get list of all Remote LA engineering jobs available on CList
  router.get('/la-eng', (req, res, next) => {
    console.log("CList Remote LA Eng Jobs - path: '/clist-remote/la-eng'");
    fetchCLRemoteLAEngJobs(req, res);
  });

  // get list of all Remote LA software jobs available on CList
  router.get('/la-sof', (req, res, next) => {
    console.log("CList Remote LA SW Jobs - path: '/clist-remote/la-sof'");
    fetchCLRemoteLASofJobs(req, res);
  });

  // get list of all Remote LA webdev jobs available on CList
  router.get('/la-web', (req, res, next) => {
    console.log("CList Remote LA Web Jobs - path: '/clist-remote/la-web'");
    fetchCLRemoteLAWebJobs(req, res);
  });

  // get list of all Remote OC engineering jobs available on CList
  router.get('/oc-eng', (req, res, next) => {
    console.log("CList Remote OC Eng Jobs - path: '/clist-remote/oc-eng'");
    fetchCLRemoteOCEngJobs(req, res);
  });

  // get list of all Remote OC software jobs available on CList
  router.get('/oc-sof', (req, res, next) => {
    console.log("CList Remote OC SW Jobs - path: '/clist-remote/oc-sof'");
    fetchCLRemoteOCSofJobs(req, res);
  });

  // get list of all Remote OC webdev jobs available on CList
  router.get('/oc-web', (req, res, next) => {
    console.log("CList Remote OC Web Jobs - path: '/clist-remote/oc-web'");
    fetchCLRemoteOCWebJobs(req, res);
  });
};
