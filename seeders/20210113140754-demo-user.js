'use strict';
const faker = require('faker');
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');

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

    const hashedPassword = await bcrypt.hash('pornhub', config.SALT_ROUNDS);

    const mockUsers = new Array(10).fill().map(() => ({
      email: faker.internet.email(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const mockEtichete = new Array(10).fill().map(() => ({
      nume: faker.internet.email(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', mockUsers, {});
    await queryInterface.bulkInsert('Eticheta', mockEtichete, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
