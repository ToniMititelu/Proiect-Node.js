const faker = require('faker');
'use strict';

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

    const mockActors = new Array(10).fill().map(() => ({
        nume: faker.name.findName(),
        gen: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    const johnnySins = {
      nume: "Johnny Sins",
      gen: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const miaKhalifa = {
      nume: "Mia Khalifa",
      gen: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockActors.push(johnnySins);
    mockActors.push(miaKhalifa);

    const mockFilme = new Array(10).fill().map(() => ({
        nume: faker.name.findName(),
        descriere: faker.commerce.productDescription(),
        rating: faker.random.number()%10,
        categorie: faker.name.jobTitle(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    const mockRols = [
      {
        filmId: 2,
        actorId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        filmId: 2,
        actorId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert('Actors', mockActors, {});
    await queryInterface.bulkInsert('Films', mockFilme, {});
    await queryInterface.bulkInsert('ActorsFilms', mockRols, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Actors', null, {});
    await queryInterface.bulkDelete('Films', null, {});
    await queryInterface.bulkDelete('ActorsFilms', null, {});
  }
};
