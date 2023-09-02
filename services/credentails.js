const {
  loginTypeIdMap,
  loginTypeDetails,
  LOGIN_TYPES,
} = require("../constants/login-types");
const { BaseError } = require("../core/errors/base-error");
const { DatabaseError, ValidationError } = require("../core/errors/errors");
const DatabaseContext = require("../database");

class CredentailService {
  constructor() {
    this.db = DatabaseContext.db;
  }

  createCredentails = async (type, userId, value) => {
    try {
      const loginTypeId = loginTypeIdMap[LOGIN_TYPES[type]];
      const [credentails, created] = await this.db.UserCredentail.findOrCreate({
        where: { userId, loginTypeId },
        defaults: {
          userId,
          loginTypeId,
          value,
        },
      });
      // if (!created)
      //   throw new ValidationError(
      //     `user already have ${type}. Please try forgot ${type}`
      //   );
      return true;
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new DatabaseError("Error in createCredentails", error);
    }
  };
}

module.exports = CredentailService;
