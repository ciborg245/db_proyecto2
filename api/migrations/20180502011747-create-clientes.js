'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      fechanacimiento: {
        type: Sequelize.DATEONLY
      },
      correo: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      direccion: {
        type: Sequelize.STRING
      },
      limitecredito: {
        type: Sequelize.DOUBLE
      },
      foto: {
        type: Sequelize.STRING
      },
      twitterId: {
        type: Sequelize.INTEGER
      },
      idtipocliente: {
        type: Sequelize.INTEGER
      },
      idproducto: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clientes');
  }
};