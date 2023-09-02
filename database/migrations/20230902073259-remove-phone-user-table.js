"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn("users", "phone", { transaction });
      await queryInterface.removeColumn("users", "country_id", { transaction });
      await queryInterface.addColumn(
        "users",
        "approval_status",
        {
          defaultValue: 1,
          type: Sequelize.DataTypes.TINYINT,
          after: "email",
          allowNull: false,
        },
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        "users",
        "phone",
        {
          allowNull: true,
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "users",
        "country_id",
        {
          allowNull: true,
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction }
      );
      await queryInterface.removeColumn("users", "approval_status", {
        transaction,
      });
    });
  },
};
