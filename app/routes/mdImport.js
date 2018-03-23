// =================================================================
// '/import-md/'             -- Returns all files available for importing
// '/import-md/:fname'       -- Returns the joblisting-urls/data imported from the named file
//
// =================================================================
let processor = require("../parsers/mdImport/utils");

module.exports = function(router) {
  // get a collection of all my available remote jobs from all sources
  router.get('/', (req, res, next) => {
    console.log("ALL FILES AVAILABE for IMPORTING - path: '/import-md/'");
    res.status(200).json({jobs: "tbd - not yet implemented"});
  });

  // get list of all available tech sources
  router.get('/:fname', (req, res, next) => {
    console.log("ALL JOB listings from FILE - path: '/import-md/:fname'");
    res.status(200).json({jobs: 'tbd: not yet implemented'});
  });
};
