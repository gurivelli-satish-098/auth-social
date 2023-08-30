const DatabaseContext = require("../database");
const { Sequelize } = require("sequelize");
const { omitBy, isNil } = require("lodash");
const { BaseError } = require("../core/errors/base-error");
const { DatabaseError } = require("../core/errors/errors");
class UserService {
  constructor() {
    this.db = DatabaseContext.db;
  }

  fetchUser = async (userName, countryId) => {
    try {
      let filter = {
        // active: 1,
      };
      if (!isNaN(userName) && countryId) {
        filter = { phone: Number(userName), countryId };
      } else {
        filter = { [Sequelize.Op.or]: [{ email: userName }, { userName }] };
      }
      const user = await this.db.User.findAll({
        where: filter,
        attributes: ["id", "userName"],
      });
      return user;
    } catch (error) {
      throw new DatabaseError("Error in fetchUser", error);
    }
  };

  createUser = async (phone, countryId, email, userName, roleId) => {
    try {
      const createArgs = omitBy(
        { phone, countryId, email, userName, roleId },
        isNil
      );
      const [user, created] = await this.db.User.findOrCreate({
        where: { userName },
        defaults: createArgs,
      });
      return user;
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new DatabaseError("Error in createUser", error);
    }
  };
}

module.exports = UserService;
