const sucursales = require('../models').sucursales;
const db = require('../models/index');

var sucursalesController = {};

//Función para editar una Sucursal
sucursalesController.updateSucursal = function(req, res) {
    //Se empieza a construir el query de UPDATE con la información del body de la request
    let query = "UPDATE sucursales SET ";
    for (var prop in req.body)
        if (req.body.hasOwnProperty(prop) && prop != "id") {
            if (typeof req.body[prop] != "number") {
                query += `${prop} = '${req.body[prop]}', `
            } else {
                query += `${prop} = ${req.body[prop]}, `
            }
        }

    //Después de terminar el SET, se agrega la condición de WHERE
    query = query.substring(0, query.length-2)
        + ` WHERE id = ${req.params.storeId};`;

    //Se realiza el query
    db.sequelize.query(query).spread((results, metadata) => {
        res.status(200).send({
            success : true,
            msg : "Producto actualizado."
        })
    }).catch(error => res.send({success: false, msg: error}));
}

//Función para borrar un registro de Sucursales
sucursalesController.deleteSucursal = function(req, res) {
    //Se construye el query
    let query = `DELETE FROM sucursales WHERE id = ${req.params.storeId}`;

    //Se realiza el query
    db.sequelize.query(query).spread((results, metadata) => {
        res.status(204).send({
            success : true,
            msg : "Producto borrado."
        })
    }).catch(error => res.status(404).send({success: false, msg: error}));
}

//Función para recuperar una cantidad X de registros de la base de datos
sucursalesController.getSucursales = function(req, res) {
    //Se empieza a construir el query
    let query = `SELECT * FROM sucursales`;

    //Se agrega un ORDER BY, un LIMIT y un OFFSET
    if (req.query.orderby) {
        query += ` ORDER BY ${req.query.orderby} `
    }

    if (req.query.offset) {
        query += ` OFFSET ${req.query.offset} `
    }

    //Se realiza el query
    db.sequelize.query(query, {model: sucursales}).then(rows => {
        res.status(200).send({
            success: true,
            msg: rows
        })
    }).catch(error => res.status(404).send({success: false, msg: error}));
}

sucursalesController.getSucursalById = function (req, res) {
  const sucursalId = req.params.storeId
  const sql = `SELECT * FROM sucursales WHERE id = :sucursalId`

  return db.sequelize
    .query(sql, {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        sucursalId: sucursalId
      }
    })
    .then((sucursal) => {
      res.json({success: true, msg: sucursal})
    })
    .catch(err => {
      res.json({success: false, msg: err})
    })
}


module.exports = sucursalesController;
