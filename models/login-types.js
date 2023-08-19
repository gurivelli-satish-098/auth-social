"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LoginType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.LoginType.hasMany(models.UserCredentail, {
        foreignKey: "loginTypeId",
        sourceKey: "id",
      });
    }
  }
  LoginType.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiry: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 525960,
        comment: "in minutes",
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "LoginType",
      tableName: "login_types",
      timestamps: false,
      freezeTableName: true,
    }
  );
  return LoginType;
};
