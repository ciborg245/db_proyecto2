'use strict';
module.exports = (sequelize, DataTypes) => {
  var clientes = sequelize.define('clientes', {
    nombre: DataTypes.STRING,
    genero: DataTypes.STRING,
    fechanacimiento: DataTypes.DATEONLY,
    correo: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    direccion: DataTypes.STRING,
    limitecredito: DataTypes.DOUBLE,
    foto: DataTypes.STRING,
    twitterId: DataTypes.INTEGER,
    idtipocliente: DataTypes.INTEGER,
    idproducto: DataTypes.INTEGER
  }, {});
  clientes.associate = function(models) {
    // associations can be defined here
  };
  return clientes;
};