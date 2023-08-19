const DatabaseContext = require("../database");

class cacheService{
    constructor(db) {
        this.db = db || DatabaseContext.connect();
    }
};

module.exports = cacheService;