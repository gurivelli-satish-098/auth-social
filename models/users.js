"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
      models.User.hasMany(models.UserCredentail, {
        foreignKey: "userId",
        sourceKey: "id",
      });
      models.User.hasOne(models.Profile, {
        foreignKey: "userId",
        sourceKey: "id",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "role_id",
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "user_name",
        unique: true,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      approvalStatus: {
        allowNull: false,
        type: DataTypes.TINYINT,
        defaultValue: 1,
        field: "approval_status",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};

// remove name column and add active column
