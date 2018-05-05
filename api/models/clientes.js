'use strict';
module.exports = (sequelize, DataTypes) => {
  var clientes = sequelize.define('clientes', {
    nombre: DataTypes.STRING,
    genero: DataTypes.STRING,
    fechanacimiento: DataTypes.DATEONLY,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    limitecredito: DataTypes.DOUBLE,
    foto: DataTypes.STRING,
    id_twitter: DataTypes.INTEGER,
    id_tipocliente: DataTypes.INTEGER,
    id_producto: DataTypes.INTEGER
  }, {});
  clientes.associate = function(models) {
    // associations can be defined here
  };
  return clientes;
};