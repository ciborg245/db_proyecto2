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
        type: Sequelize.STRING
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
      id_twitter: {
        type: Sequelize.INTEGER
      },
      id_tipocliente: {
        type: Sequelize.INTEGER
      },
      id_producto: {
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