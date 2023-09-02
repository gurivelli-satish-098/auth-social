const { ADMIN_USER_NAME_LENGTH } = require("../constants");
const { roles, roleNameIdMap, roleIdNameMap } = require("../constants/roles");
const { BaseError } = require("../core/errors/base-error");
const { InternalError, ValidationError } = require("../core/errors/errors");
const {
  createRandomString,
  isValidLength,
  validateUserNameAndPassword,
} = require("../helpers");
const UserService = require("../services/users");

class UserFacade {
  constructor() {
    this.userService = new UserService();
  }

  createUser = async (email, userName, role) => {
    try {
      if (!validateUserNameAndPassword(userName))
        throw new ValidationError("Enter Valid userName");
      const userViaUserName = await this.userService.fetchUser({ userName });
      if (userViaUserName)
        throw new ValidationError("userName already exists.");
      const user = await this.userService.createUser(
        email,
        userName,
        roleNameIdMap[roles[role]],
        role === "user" ? 1 : 0
      );
      return user;
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalError("Error in createUser", error);
    }
  };

  createUserName = async (retries) => {
    //only for admin
    try {
      if (retries === 0)
        throw new InternalError("Error while creating userName.");
      const userName = createRandomString(ADMIN_USER_NAME_LENGTH);
      const userViaUserName = await this.userService.fetchUser({
        userName: "ADMIN3_" + userName,
      });
      if (!userViaUserName) return "ADMIN3_" + userName;
      await this.createUserName(retries - 1);
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalError("Error in createUserName", error);
    }
  };

  approveUser = async (adminEmail, userEmail) => {
    try {
      const admin = await this.userService.fetchUser({ email: adminEmail });
      if (roleIdNameMap[admin?.roleId] !== roles.admin)
        throw new ValidationError("Please enter valid Admin.");
      if (admin?.approvalStatus === 0)
        throw new ValidationError("Admin has no access to approve");
      const user = await this.userService.fetchUser({ email: userEmail });
      if (!user) throw new ValidationError("No such user Exists.");
      return this.userService.updateUser({
        userId: user?.id,
        approvalStatus: 1,
      });
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalError("Error in approveUser", error);
    }
  };
}

module.exports = UserFacade;
