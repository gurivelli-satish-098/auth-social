const { BaseError } = require("./base-error");

/**
 * ErrorHandler
 */
class ErrorHandler {
  handleError = (err) => {
    // TODO: notify or sentry
  };

  isTrustedError = (error) => {
    return error instanceof BaseError && error.isOperational;
  };
}

module.exports = new ErrorHandler();
