const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BaseError } = require("../core/errors/base-error");
const {
  AuthorizationError,
  AuthenticationError,
} = require("../core/errors/errors");
const { saltRounds } = require("../constants/auth");
const ConfigManager = require("../core/lib/manager");
const { roleIdNameMap } = require("../constants/roles");

class AuthService {
  createHashedSecret = async (identifierSecret) => {
    try {
      return await bcrypt.hash(identifierSecret, saltRounds);
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new AuthorizationError("Error in createHashedSecret", error);
    }
  };

  verifyUserSecret = async (
    userSecret, // password entered by user
    identifierSecret // encrypted password of user
  ) => {
    try {
      return await bcrypt.compare(userSecret, identifierSecret);
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new AuthenticationError("Error in verifyUserSecret", error);
    }
  };

  verifiyCookie = async (authorization) => {
    try {
      const secret = ConfigManager.get("JWT_SECRET");
      return jwt.verify(authorization, secret);
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new AuthenticationError("authorization Token verification failed.");
    }
  };

  generateAccessToken = async (user) => {
    try {
      const secret = ConfigManager.get("JWT_SECRET");
      const payload = {
        userId: user?.id,
        role: roleIdNameMap[user?.roleId],
        userName: user?.userName,
        iat: Date.now(),
      };
      const token = jwt.sign(payload, secret, {
        expiresIn: "90d",
      });
      return token;
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new AuthorizationError("Error in generateAccessToken", error);
    }
  };
}

module.exports = AuthService;
