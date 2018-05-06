'use strict';
module.exports = (sequelize, DataTypes) => {
  var tipocliente = sequelize.define('tipocliente', {
    descuento: DataTypes.INTEGER,
    nombre: DataTypes.STRING
  }, {});
  tipocliente.associate = function(models) {
    // associations can be defined here
  };
  return tipocliente;
};