const departamentos = require('../models').departamentos;
const db = require('../models/index');

var departamentosController = {};

//Función para editar un Departamento
departamentosController.updateDepartamento = function(req, res) {
    //Se empieza a construir el query de UPDATE con la información del body de la request
    let query = "UPDATE departamentos SET ";

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
            msg : "Producto actualizado."
        })
    }).catch(error => res.send({success: false, msg: error}));
}

//Función para borrar un Departamento
departamentosController.deleteDepartamento = function(req, res) {
    //Se construye el query
    let query = `DELETE FROM departamentos WHERE id = ${req.body.id}`;

    //Se realiza el query
    db.sequelize.query(query).spread((results, metadata) => {
        res.status(204).send({
            success : true,
            msg : "Producto borrado."
        })
    }).catch(error => res.status(404).send({success: false, msg: error}));
}

//Función para recuperar una cantidad X de registros de la base de datos
departamentosController.getDepartamentos = function(req, res) {
    //Se empieza a construir el query
    let query = `SELECT * FROM departamentos`;

    //Se agrega un ORDER BY, un LIMIT y un OFFSET
    if (req.query.orderby) {
        query += ` ORDER BY ${req.params.orderby} `
    } else {
        query += ` ORDER BY id `
    }

    query += ` LIMIT 25 `;

    if (req.query.offset) {
        query += ` OFFSET ${req.params.offset} `
    }

    //Se realiza el query
    db.sequelize.query(query, {model: departamentos}).then(rows => {
        res.status(200).send({
            success: true,
            msg: rows
        })
    }).catch(error => res.status(404).send({success: false, msg: error}));

}


module.exports = departamentosController;
