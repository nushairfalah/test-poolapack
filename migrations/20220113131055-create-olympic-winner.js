'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('olympic_winners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      athlete: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'countries',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      country_group: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      sportId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sports',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      gold: {
        type: Sequelize.INTEGER
      },
      silver: {
        type: Sequelize.INTEGER
      },
      bronze: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('olympic_winners');
  }
};