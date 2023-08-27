"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      role_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      user_name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      name: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      email: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      phone: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      country_id: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
