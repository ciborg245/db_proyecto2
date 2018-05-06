'use strict';
module.exports = (sequelize, DataTypes) => {
  var departamentos = sequelize.define('departamentos', {
    nombre: DataTypes.STRING
  }, {});
  departamentos.associate = function(models) {
    // associations can be defined here
  };
  return departamentos;
};