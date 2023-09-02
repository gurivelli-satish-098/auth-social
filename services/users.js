const DatabaseContext = require("../database");
const { Sequelize } = require("sequelize");
const { omitBy, isNil } = require("lodash");
const { BaseError } = require("../core/errors/base-error");
const { DatabaseError, ValidationError } = require("../core/errors/errors");
class UserService {
  constructor() {
    this.db = DatabaseContext.db;
  }

  fetchUser = async ({ userId, userName, email, extra }) => {
    try {
      let filter = omitBy(
        {
          id: userId,
          userName,
          email,
        },
        isNil
      );
      const user = await this.db.User.findOne({
        where: filter,
        attributes: ["id", "roleId", "userName", "email", "approvalStatus"],
      });
      return user;
    } catch (error) {
      throw new DatabaseError("Error in fetchUser", error);
    }
  };

  createUser = async (email, userName, roleId, approvalStatus) => {
    try {
      const [user, created] = await this.db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          userName,
          roleId,
          approvalStatus,
        },
      });
      if (!created) {
        throw new ValidationError("Email already Exists.");
      }
      return user;
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new DatabaseError("Error in createUser", error);
    }
  };

  updateUser = async ({ userId, approvalStatus }) => {
    try {
      return await this.db.User.update(
        {
          approvalStatus,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    } catch (error) {
      if (error instanceof BaseError) throw error;
      throw new DatabaseError("Error in updateUser", error);
    }
  };
}

module.exports = UserService;
