'use strict';
module.exports = (sequelize, DataTypes) => {
  var productos = sequelize.define('productos', {
    nombre: DataTypes.STRING,
    precio: DataTypes.DOUBLE,
    categoria: DataTypes.STRING
  }, {});
  productos.associate = function(models) {
    // associations can be defined here
  };
  return productos;
};