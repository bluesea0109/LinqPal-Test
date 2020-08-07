'use strict'

const bcrypt = require('bcrypt')
const { salt } = require('../config/auth.config')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'admin',
          lastName: 'admin',
          telephoneNumber: 'admin',
          fullAddress: 'admin',
          ssn: 'admin',
          username: 'admin',
          password: await bcrypt.hash('password', salt),
          isAdmin: true,
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
