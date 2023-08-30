const DatabaseContext = require("../database");
const { Sequelize } = require("sequelize");
const { omitBy, isNil } = require("lodash");
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
      throw new Error("Error in fetchUser", error);
    }
  };

  createUser = async (phone, countryId, email, userName) => {
    try {
      const createArgs = omitBy({ phone, countryId, email, userName }, isNil);
      const user = this.db.User.findOrCreate({
        where: { userName },
        defaults: createArgs,
      });
    } catch (error) {
      throw new Error("Error in createUser", error);
    }
  };
}

module.exports = UserService;
