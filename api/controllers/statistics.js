const db = require('../models/index');

var statisticsController = {};

//Grafica 1
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

//Grafica 2
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

//Grafica 3
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

//Grafica 4
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

//Grafica 5
statisticsController.clientsByDate = function(req, res) {
    let interval;
    if (req.params.interval == "dia") {
        interval = 1
    } else if (req.params.interval == "semana") {
        interval = 7
    } else if (req.params.interval == "mes") {
        interval = 30
    } if (req.params.interval == "año") {
        interval = 365
    }
    let query = `SELECT interv, count(id)
        FROM (SELECT TRUNC((CURRENT_DATE - "createdAt"::date) / ${interval}) as "interv", id
        FROM clientes_view) b1
        GROUP BY interv
        ORDER BY interv`;

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

//Resumen 1
statisticsController.storesByState = function(req, res) {
    let query = "SELECT nombre, count(id) FROM sucursales_departamentos GROUP BY nombre";

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

//Resumen 2
statisticsController.creditByState = function(req, res) {
    let query = "SELECT departamentos_nombre, sum(limitecredito) FROM clientes_departamentos GROUP BY departamentos_nombre";

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

//Resumen 3
statisticsController.productByState = function(req, res) {

    let query = `SELECT *
    FROM (SELECT departamentos_nombre, productos_nombre, count(*)
            FROM clientes_productos_deptos
            GROUP BY departamentos_nombre, productos_nombre) b1
    WHERE b1.count >= ALL(SELECT count(*)
                            FROM clientes_productos_deptos b2
                            WHERE b1.departamentos_nombre = b2.departamentos_nombre
                            GROUP BY b2.departamentos_nombre, b2.productos_nombre)
    ORDER BY departamentos_nombre`;

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

//Resumen 4
statisticsController.productByClientType = function(req, res) {

    let query = `SELECT *
    FROM (SELECT tipo_nombre, productos_nombre, count(*)
            FROM clientes_productos_tipos
            GROUP BY tipo_nombre, productos_nombre) b1
    WHERE b1.count >= ALL(SELECT count(*)
                            FROM clientes_productos_tipos b2
                            WHERE b1.tipo_nombre = b2.tipo_nombre
                            GROUP BY b2.tipo_nombre, b2.productos_nombre)
    ORDER BY tipo_nombre`;

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

//Resumen 5
statisticsController.productByGender = function(req, res) {

    let query = `SELECT *
    FROM (SELECT genero, productos_nombre, count(*)
    FROM clientes_productos
    GROUP BY genero, productos_nombre) b1
    WHERE count >= ALL (SELECT count(*)
                        FROM clientes_productos b2
                        WHERE b1.productos_nombre = b2.productos_nombre
                        GROUP BY productos_nombre, genero)`;

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

//Detalle 1
statisticsController.statesReport = function(req, res) {
    let query = `SELECT departamentos_nombre, avg(limitecredito), min(limitecredito), max(limitecredito), count(*)
        FROM clientes_departamentos
        GROUP BY departamentos_nombre`;

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

//Detalle 2
statisticsController.newClientsByState = function(req, res) {
    let query = `
    SELECT b3.departamentos_nombre, b2.count as "new_clients_month", b3.count as "new_clients_year", b4.count as "total_clients"
    FROM    (SELECT count(id), departamentos_nombre
                FROM (SELECT departamentos_nombre, TRUNC((CURRENT_DATE - "createdAt"::date) / 30) as "interv", id
                        FROM clientes_departamentos) a1
                WHERE interv = 0
                GROUP BY departamentos_nombre) b2,
            (SELECT count(id), departamentos_nombre
                FROM (SELECT departamentos_nombre, TRUNC((CURRENT_DATE - "createdAt"::date) / 365) as "interv", id
                        FROM clientes_departamentos) a2
                WHERE interv = 0
                GROUP BY departamentos_nombre) b3,
            (SELECT count(id), departamentos_nombre
                FROM clientes_departamentos
                GROUP BY departamentos_nombre) b4
    WHERE b2.departamentos_nombre = b3.departamentos_nombre
    AND b2.departamentos_nombre = b4.departamentos_nombre`;

    db.sequelize.query(query).then(rows => {
        res.send({
            success: true,
            rows: rows
        });
    }).catch(error => res.send({success: false, msg: error}))
}

//Detalle 3
statisticsController.clientTypeReport = function(req, res) {
    let query = `
    SELECT tipo_nombre, avg(limitecredito), min(limitecredito), max(limitecredito), count(*)
    FROM clientes_tipoclientes
    GROUP BY tipo_nombre`
}

//Detalle 4
statisticsController.ageReport = function(req, res) {
    let query = `
    SELECT (b2.interv * 10) as "age_interval", productos_nombre, b3.avg, b3.count as "clientes"
    FROM (SELECT TRUNC(edad / 10) as "interv", productos_nombre, count(id)
            FROM clientes_productos
            GROUP BY interv, productos_nombre) b2,
            (SELECT TRUNC(edad / 10) as "interv", count(id), avg(limitecredito)
            FROM clientes_productos
            GROUP BY interv) b3
    WHERE b2.count >= ALL (SELECT count(b1.id)
                            FROM (SELECT TRUNC(edad / 10) as "interv", productos_nombre, id
                                    FROM clientes_productos) b1
                            WHERE b1.productos_nombre = b2.productos_nombre
                            GROUP BY b1.interv, b1.productos_nombre)
    AND b2.interv >= 1 AND b2.interv < 6
    AND b2.interv = b3.interv
    UNION
    SELECT 60 as "age_interval", productos_nombre, avg, b3.count as "clientes"
    FROM(SELECT productos_nombre, count(id)
            FROM clientes_productos
            WHERE edad >= 60
            GROUP BY productos_nombre) b1,
            (SELECT count(id), avg(limitecredito)
            FROM clientes_productos
            WHERE edad >= 60) b3
    WHERE b1.count >= ALL (SELECT count(id)
                            FROM clientes_productos
                            WHERE edad >= 60
                            GROUP BY productos_nombre)
    ORDER BY age_interval`
}

//Detalle 5
statisticsController

module.exports = statisticsController;
