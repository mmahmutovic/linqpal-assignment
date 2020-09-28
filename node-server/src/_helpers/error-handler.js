/* eslint-disable no-unused-vars */
function errorHandler(res, err, message, status) {
  return res.status(status || 500).json({
    message: message || 'Internal server error!',
    err: err || new Error(),
  });
}

module.exports = errorHandler;
