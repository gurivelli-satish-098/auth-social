const { BaseError } = require("./base-error");

/**
 * ErrorHandler
 */
class ErrorHandler {
  handleError = (err) => {
    // TODO: notify or sentry
    console.log(err);
  };

  isTrustedError = (error) => {
    return error instanceof BaseError && error.isOperational;
  };
}

module.exports = new ErrorHandler();
