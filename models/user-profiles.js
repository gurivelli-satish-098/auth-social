"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Profile.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Profile.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "user_id",
        unique: true,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "first_name",
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "last_name",
      },
      bio: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      dob: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "user_profiles",
      timestamps: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Profile;
};

// remove name column and add active column
