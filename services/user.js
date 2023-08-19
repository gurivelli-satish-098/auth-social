const DatabaseContext = require("../database");

class userService {
  constructor(db) {
    this.db = db || DatabaseContext.connect();
  }
}

module.exports = userService;
