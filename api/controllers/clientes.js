const clientes = require('../models').clientes;
const db = require('../models/index');

var clientesController = {};

clientesController.createCliente = function(req, res) {
    clientes.create({
        nombre: req.body.nombre,
        genero: req.body.genero,
        fechanacimiento: req.body.fechanacimiento,
        correo: req.body.correo,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        limitecredito: req.body.limitecredito,
        foto: req.body.foto,
        id_twitter: req.body.id_twitter,
        id_tipocliente: req.body.id_tipocliente,
        id_producto: req.body.id_producto
    }).then(cliente => res.send({success: true, msg: cliente}) )
    .catch(error => res.send({success: false, msg: error}))
}

clientesController.updateCliente = function(req, res) {
    let query = "UPDATE clientes SET ";
    for (var prop in req.body)
        if (req.body.hasOwnProperty(prop) && prop != "id") {
            if (typeof req.body[prop] != "number") {
                query += `${prop} = '${req.body[prop]}', `
            } else {
                query += `${prop} = ${req.body[prop]}, `
            }
        }

    query = query.substring(0, query.length-2)
        + ` WHERE id = ${req.body.id};`;

    db.sequelize.query(query).spread((results, metadata) => {
        res.send({
            success : true,
            msg : "Cliente actualizado."
        })
    }).catch(error => res.send({success: false, msg: error}));
}

clientesController.deleteCliente = function(req, res) {
    let query = `DELETE FROM clientes WHERE id = ${req.body.id}`;

    db.sequelize.query(query).spread((results, metadata) => {
        res.send({
            success : true,
            msg : "Cliente borrado."
        })
    }).catch(error => res.send({success: false, msg: error}));
}

clientesController.getClientes = function(req, res) {
    let query = `SELECT * FROM clientes`;

    if (req.body.orderby) {
        query += ` ORDER BY ${req.body.orderby} `
    }

    if (req.body.limit) {
        query += ` LIMIT ${req.body.limit} `
    }

    if (req.body.offset) {
        query += ` OFFSET ${req.body.offset} `
    }

    db.sequelize.query(query, {model: clientes}).then(rows => {
        res.send({
            success: true,
            msg: rows
        })
    }).catch(error => res.send({success: false, msg: error}));

}

module.exports = clientesController;
