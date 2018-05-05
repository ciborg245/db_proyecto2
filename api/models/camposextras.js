'use strict';
module.exports = (sequelize, DataTypes) => {
  var camposextras = sequelize.define('camposextras', {
    id_cliente: DataTypes.INTEGER,
    columna: DataTypes.STRING,
    valor: DataTypes.STRING
  }, {});
  camposextras.associate = function(models) {
    // associations can be defined here
  };
  return camposextras;
};