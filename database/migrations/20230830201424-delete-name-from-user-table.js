'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'users',
      'name'
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'name',
      {
        type: Sequelize.STRING,
        after: "user_name",
      }
    );
  }
};
