const AuthService = require("../services/auth");
const UserService = require("../services/users");
const DatabaseContext = require("../database");
const { compareCredential } = require("../auth/compare");
const { ADMIN_USER_NAME_LENGTH } = require("../constants");
const { roles, roleNameIdMap, roleIdNameMap } = require("../constants/roles");
const { BaseError } = require("../core/errors/base-error");
const {
  InternalError,
  ValidationError,
  AuthenticationError,
} = require("../core/errors/errors");
const {
  createRandomString,
  isValidLength,
  validateUserNameAndPassword,
} = require("../helpers");
const {
  loginTypeIdMap,
  LOGIN_TYPES,
  loginIdTypeMap,
} = require("../constants/login-types");

class UserFacade {
  constructor() {
    this.db = DatabaseContext.db;
    this.userService = new UserService();
    this.authService = new AuthService();
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
      console.log(admin);
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

  masterLogin = async (adminEmail, userName, identifierSecret) => {
    try {
      const admin = await this.userService.fetchUser({ email: adminEmail });
      if (
        roleIdNameMap[admin?.role] === roles[admin] &&
        admin?.approvalStatus !== 1
      )
        throw new ValidationError("Enter valid Admin Email");
      const user = await this.userService.fetchUser({ userName });
      if (!user) throw new ValidationError("No such user found");
      const isMatch = await compareCredential({
        type: "master-password",
        credentials: identifierSecret,
      });
      if (!isMatch) throw new AuthenticationError("Enter valid password.");
      return await this.authService.generateAccessToken(user);
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalError("Error in masterLogin", error);
    }
  };

  userLogin = async (email, identifierSecret) => {
    try {
      const includeFilter = [
        {
          model: this.db.UserCredentail,
          required: true,
          attributes: ["value"],
          where: {
            loginTypeId: loginTypeIdMap[LOGIN_TYPES.password],
          },
        },
      ];
      const user = await this.userService.fetchUser({
        email,
        extra: { includeFilter },
      });
      if (!user) throw new ValidationError("Enter valid email");
      const isMatch = await compareCredential({
        type: "password",
        userSecret: user?.UserCredentails[0]?.value,
        credentials: identifierSecret,
      });
      if (!isMatch) throw new AuthenticationError("Enter valid password.");
      return await this.authService.generateAccessToken(user);
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new InternalError("Error in userLogin", error);
    }
  };
}

module.exports = UserFacade;
