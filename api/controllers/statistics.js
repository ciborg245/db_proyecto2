const db = require('../models/index');

var statisticsController = {};

statisticsController.favoriteProduct = function(req, res) {
    let query = "SELECT productos_nombre, count(id)";

    let subquery = `WHERE edad >= ${req.params.min} AND edad <= ${req.params.max} `;

    if (req.params.gender == "m") {
        query += `, genero FROM clientes_productos ${subquery} AND genero = 'masculino' GROUP BY productos_nombre, genero;`
    } else if (req.params.gender == "f") {
        query += `, genero FROM clientes_productos ${subquery} AND genero = 'femenino' GROUP BY productos_nombre, genero;`
    } else {
        query += ` FROM clientes_productos ${subquery} GROUP BY productos_nombre;`
    }

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

statisticsController.favoriteCategory = function(req, res) {
    let query = "SELECT categoria, count(id)";

    let subquery = `WHERE edad >= ${req.params.min} AND edad <= ${req.params.max} `;

    if (req.params.gender == "m") {
        query += `, genero FROM clientes_productos ${subquery} AND genero = 'masculino' GROUP BY categoria, genero;`
    } else if (req.params.gender == "f") {
        query += `, genero FROM clientes_productos ${subquery} AND genero = 'femenino' GROUP BY categoria, genero;`
    } else {
        query += ` FROM clientes_productos ${subquery} GROUP BY categoria;`
    }

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

statisticsController.popularState = function(req, res) {
    let query = "SELECT departamentos_nombre, count(id)";

    let subquery = `WHERE edad >= ${req.params.min} AND edad <= ${req.params.max} `;
    subquery += `AND limitecredito >= ${req.params.cmin} AND limitecredito <= ${req.params.cmax}`

    if (req.params.gender == "m") {
        query += `, genero FROM clientes_departamentos ${subquery} AND genero = 'masculino' GROUP BY departamentos_nombre, genero;`
    } else if (req.params.gender == "f") {
        query += `, genero FROM clientes_departamentos ${subquery} AND genero = 'femenino' GROUP BY departamentos_nombre, genero;`
    } else {
        query += ` FROM clientes_departamentos ${subquery} GROUP BY departamentos_nombre;`
    }

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

statisticsController.frequentClientTypes = function(req, res) {
    let query = "SELECT tipo_nombre, count(id)";

    let subquery = `WHERE edad >= ${req.params.min} AND edad <= ${req.params.max} `;
    subquery += `AND limitecredito >= ${req.params.cmin} AND limitecredito <= ${req.params.cmax}`

    if (req.params.gender == "m") {
        query += `, genero FROM clientes_tipoclientes ${subquery} AND genero = 'masculino' GROUP BY tipo_nombre, genero;`
    } else if (req.params.gender == "f") {
        query += `, genero FROM clientes_tipoclientes ${subquery} AND genero = 'femenino' GROUP BY tipo_nombre, genero;`
    } else {
        query += ` FROM clientes_tipoclientes ${subquery} GROUP BY tipo_nombre;`
    }

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

module.exports = statisticsController;
