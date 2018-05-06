const clientes = require('../models').clientes;
const db = require('../models/index');

var clientesController = {};

//Función para crear un nuevo Cliente dentro de la base de datos
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
    }).then(cliente => res.status(201).send({success: true, msg: cliente}) )
    .catch(error => res.status(400).send({success: false, msg: error}))
}

//Función para editar un Cliente
clientesController.updateCliente = function(req, res) {
    //Se empieza a construir el query de UPDATE con la información del body de la request
    let query = "UPDATE clientes SET ";
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
        + ` WHERE id = ${req.body.id};`;

    //Se realiza el query
    db.sequelize.query(query).spread((results, metadata) => {
        res.status(200).send({
            success : true,
            msg : "Cliente actualizado."
        })
    }).catch(error => res.send({success: false, msg: error}));
}

//Función para borrar un registro de Clientes
clientesController.deleteCliente = function(req, res) {
    //Se construye el query
    let query = `DELETE FROM clientes WHERE id = ${req.body.id}`;

    //Se realiza el query
    db.sequelize.query(query).spread((results, metadata) => {
        res.status(204).send({
            success : true,
            msg : "Cliente borrado."
        })
    }).catch(error => res.status(404).send({success: false, msg: error}));
}

//Función para recuperar una cantidad X de registros de la base de datos
clientesController.getClientes = function(req, res) {
    //Se empieza a construir el query
    let query = `SELECT * FROM clientes`;

    //Se agrega un ORDER BY, un LIMIT y un OFFSET
    if (req.query.orderby) {
        query += ` ORDER BY ${req.params.orderby} `
    }

    query += ` LIMIT 25 `;

    if (req.query.offset) {
        query += ` OFFSET ${req.params.offset} `
    }

    //Se realiza el query
    db.sequelize.query(query, {model: clientes}).then(rows => {
        res.status(200).send({
            success: true,
            msg: rows
        })
    }).catch(error => res.status(404).send({success: false, msg: error}));

}

module.exports = clientesController;
