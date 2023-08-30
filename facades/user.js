const { roleIdNameMap, roles, roleNameIdMap } = require("../constants/roles");
const { BaseError } = require("../core/errors/base-error");
const { InternalError } = require("../core/errors/errors");
const UserService = require("../services/user");

class UserFacade {
  constructor() {
    this.userService = new UserService();
  }

  createUser = async (email, phone, countryId, userName, role) => {
    try {
      const user = await this.userService.createUser(
        phone,
        countryId,
        email,
        userName,
        roleNameIdMap[roles[role]]
      );
      return user;
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalError("Error in createUser", error);
    }
  };

  createUserName = async () => { //only for admin
    try {
      //here
      return "admin1";
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalError("Error in createUserName", error);
    }
  };

  validateUserName = async (userName) => {
    try {
      //here
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalError("Error in validateUserName", error);
    }
  };
}

module.exports = UserFacade;
