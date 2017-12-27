const remoteMiscRoutes = require('./remotes-misc');
const localCListRoutes = require('./clist-cv');

module.exports = function(app, express) {
  // --- Create the high-level routers
  const remoteMiscRouter = express.Router();
  const localCListRouter = express.Router();

  // --- Register (to APP) and map routers to respective sub-paths
  app.use('/remote', remoteMiscRouter);
  app.use('/clist-local', localCListRouter);

  // --- Add endpoint handlers to each router
  remoteMiscRoutes(remoteMiscRouter);
  localCListRoutes(localCListRouter);
};
