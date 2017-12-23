// ===================================================
// -- Client Error Handlers
// --   404 Handler
// ===================================================
var handle404 = function(req, res, next) {
  res.status(404).send('Route Not Found');
};

// ===================================================
// -- Server Error Handlers
// ===================================================
// Development
// Allow Stacktrace
var handleDev5xx = function(error, req, res, next) {
  let status = error.status || 500;
  console.log("error-status: " + status);

  res.status(status).json({
    status: "500 error",
    message: error.message,
    error: error
  });
};

// Production
// Remove Stacktrace
var handleProd5xx = function(error, req, res, next) {
  let status = error.status || 500;
  console.log("error-status: " + status);

  res.status(status).json({
    status: "500 error",
    message: error.message,
    error: {}
  });
};

var handleErrors = function(app) {
  app.use(handle404);

  if (app.get('env') === 'development') {
    app.use(handleDev5xx);
  }

  app.use(handleProd5xx);
}

module.exports = handleErrors;

