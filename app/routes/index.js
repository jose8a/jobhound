const remoteMiscRoutes = require('./remotes-misc');
const remoteCListRoutes = require('./clist-remote');
const localCListRoutes = require('./clist-cv');

module.exports = function(app, express) {
  // --- Create the high-level routers
  const remoteMiscRouter = express.Router();
  const remoteCListRouter = express.Router();
  const localCListRouter = express.Router();

  // --- Register (to APP) and map routers to respective sub-paths
  app.use('/remote', remoteMiscRouter);
  app.use('/clist-remote', remoteCListRouter);
  app.use('/clist-local', localCListRouter);

  // --- Add endpoint handlers to each router
  remoteMiscRoutes(remoteMiscRouter);
  remoteCListRoutes(remoteCListRouter);
  localCListRoutes(localCListRouter);
};
