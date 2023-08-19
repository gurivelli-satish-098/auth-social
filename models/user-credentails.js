"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCredentail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserCredentail.belongsTo(models.LoginType, {
        foreignKey: "loginTypeId",
      });
      models.UserCredentail.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  UserCredentail.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      loginTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "login_type_id",
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserCredentail",
      tableName: "user_credentails",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return UserCredentail;
};
