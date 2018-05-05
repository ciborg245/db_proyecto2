'use strict';
module.exports = (sequelize, DataTypes) => {
  var sucursales = sequelize.define('sucursales', {
    idDepto: DataTypes.INTEGER,
    direccion: DataTypes.STRING
  }, {});
  sucursales.associate = function(models) {
    // associations can be defined here
  };
  return sucursales;
};