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
        twitterId: req.body.twitterId,
        idtipocliente: req.body.idtipocliente,
        idproducto: req.body.idproducto
    }).then(cliente => res.send({success: true, msg: cliente}) )
    .catch(error => res.send({success: false, msg: error}))
}

clientesController.updateCliente = function(req, res) {
    var query = "UPDATE clientes SET ";
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

module.exports = clientesController;
