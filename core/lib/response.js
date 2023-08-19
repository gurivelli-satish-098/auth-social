const HttpStatus = require("http-status");
const { isNil, isEmpty } = require("lodash");

class ApiResponse {
  constructor({
    success = true,
    data,
    message,
    status = HttpStatus.OK,
    errors,
  }) {
    this.success = success;
    this._data = data || [];
    this._message = isNil(message) ? "Your request was successful." : message;
    this._errors = isEmpty(errors) ? [] : errors;
    this._status = HttpStatus[status];
  }

  format() {
    return Object.assign({
      status: this._status,
      message: this._message,
      data: this._data,
      errors: this._errors,
    });
  }
}

module.exports = ApiResponse;
