const remoteMiscRoutes = require('./remotes-misc');

module.exports = function(app, express) {
  // --- Create the high-level routers
  const remoteMiscRouter = express.Router();

  // --- Register (to APP) and map routers to respective sub-paths
  app.use('/remote', remoteMiscRouter);

  // --- Add endpoint handlers to each router
  remoteMiscRoutes(remoteMiscRouter);
};
