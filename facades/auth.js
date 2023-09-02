const { BaseError } = require("../core/errors/base-error");
const { ValidationError } = require("../core/errors/errors");
const ConfigManager = require("../core/lib/manager");
const { validateUserNameAndPassword } = require("../helpers");
const AuthService = require("../services/auth");
const CredentailService = require("../services/credentails");
const UserService = require("../services/users");

class AuthFacade {
  constructor() {
    this.credentailService = new CredentailService();
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  createPassword = async (userId, newPassword, confirmPassword) => {
    try {
      if (newPassword !== confirmPassword)
        throw new ValidationError(
          "new Password and confirm Password must be same."
        );
      if (!validateUserNameAndPassword(newPassword))
        throw new ValidationError("Enter Valid password");
      const hashedSecret = await this.authService.createHashedSecret(
        newPassword
      );
      await this.credentailService.createCredentails(
        "password",
        userId,
        hashedSecret
      );
      const user = await this.userService.fetchUser({ userId });
      return await this.authService.generateAccessToken(user);
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new ValidationError("Error in createPassword", error);
    }
  };
}

module.exports = AuthFacade;
