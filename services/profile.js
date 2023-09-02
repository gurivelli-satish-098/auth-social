const DatabaseContext = require("../database");

class ProfileService {
    constructor(){
        this.db = DatabaseContext.db;
    }
}

module.exports = ProfileService;