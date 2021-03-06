const clientes = require('../models').clientes;
const camposextras = require('../models').camposextras;
const db = require('../models/index');

var clientesController = {};

//Función para crear un nuevo Cliente dentro de la base de datos
clientesController.createCliente = function(req, res) {
    let body = req.body;
    let query = "INSERT INTO clientes VALUES(DEFAULT, ";
    query += `'${body.nombre}', '${body.genero}', '${body.fechanacimiento}', '${body.correo}', ${body.telefono}, '${body.direccion}', ${body.limitecredito}, '${body.foto}', '${body.id_twitter}', ${body.id_tipocliente}, ${body.id_producto}, ${body.id_depto}, :created, :updated) RETURNING *;`

    db.sequelize.query(query, {
        replacements: {
            created: new Date(),
            updated: new Date()
        }
    }).then(client => {
        let clientId = client[0][0].id;
        let queryExtras = "";

        for (var extra in body.extras) {
            queryExtras += `INSERT INTO camposextras VALUES(DEFAULT, ${clientId}, '${extra}', '${body.extras[extra]}', :created, :updated);`
        }

        db.sequelize.query(queryExtras, {
            replacements: {
                created: new Date(),
                updated: new Date()
            }
        }).then(resp => res.send({success: true}))
        .catch(error => res.status(400).send({success: false, msg: error}))
    }).catch(error => res.status(400).send({success: false, msg: error}))
}

//Función para editar un Cliente
clientesController.updateCliente = function(req, res) {
    //Se empieza a construir el query de UPDATE con la información del body de la request
    let query = "UPDATE clientes SET ";
    let queryExtras = "";
    let body = req.body;

    //Se realiza un query de UPDATE por cada campo extra
    if (body.hasOwnProperty('extras')) {
        if (body.extras.hasOwnProperty('update'))
            for (var extra in body.extras.update) {
                let queryEx = "UPDATE camposextras SET "

                queryEx += `valor = '${body.extras.update[extra].value}', columna = '${body.extras.update[extra].column}' WHERE id = '${extra}'`

                queryExtras += `${queryEx} ;`;
            }
        if (body.extras.hasOwnProperty('new'))
        for (var extra in body.extras.new) {
            queryExtras += `INSERT INTO camposextras VALUES(DEFAULT, ${req.params.clientId}, '${extra}', '${body.extras.new[extra]}', :created, :updated);`
        }
    }

    //Se hace el query con los datos default de cliente
    query += `nombre = '${body.nombre}', genero = '${body.genero}', fechanacimiento = '${body.fechanacimiento}', correo = '${body.correo}', telefono = ${body.telefono}, direccion = '${body.direccion}', `;
    query += `limitecredito = ${body.limitecredito}, foto = '${body.foto}', id_twitter = '${body.id_twitter}', id_tipocliente = ${body.tipocliente}, id_producto = ${body.id_producto}, id_depto = ${body.id_depto} `

    //Después de terminar el SET, se agrega la condición de WHERE
    query +=`WHERE id = ${req.params.clientId};` + queryExtras;

    //Se realiza el query
    db.sequelize.query(query, {
        replacements: {
            created: new Date(),
            updated: new Date()
        }
    }).spread((results, metadata) => {
        res.status(200).send({
            success : true,
            msg : "Cliente actualizado."
        })
    }).catch(error => res.send({success: false, msg: error}));
}

//Función para borrar un registro de Clientes
clientesController.deleteCliente = function(req, res) {
    //Se construye el query
    let query = `DELETE FROM clientes WHERE id = ${req.params.clientId}`;

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
    if (req.query.state) {
      query += ` WHERE id_depto = ${req.query.state}`
      if (req.query.type) {
        query += ` AND id_tipocliente = ${req.query.type}`
      }
      if (req.query.name) {
        query += ` AND nombre LIKE \'%${req.query.name}%\'`
      }
    } else if (req.query.type) {
      query += ` WHERE id_tipocliente = ${req.query.type}`
      if (req.query.name) {
        query += ` AND nombre LIKE \'%${req.query.type}%\'`
      }
    } else if (req.query.name) {
      query += ` WHERE nombre LIKE \'%${req.query.name}%\'`
    }

    //Se agrega un ORDER BY, un LIMIT y un OFFSET
    if (req.query.orderby) {
      query += ` ORDER BY ${req.query.orderby} `
    } else {
      query += ` ORDER BY id `
    }


    //Se realiza el query
    db.sequelize.query(query, {model: clientes}).then(rows => {
        res.status(200).send({
            success: true,
            msg: rows
        })
    }).catch(error => res.status(404).send({success: false, msg: error}));
}

//Funcion para eliminar un campo extra
clientesController.deleteExtra = function(req, res) {
    //Se construye el query
    let query = `DELETE FROM camposextras WHERE id = ${req.params.fieldId}`;

    //Se realiza el query
    db.sequelize.query(query).spread((results, metadata) => {
        res.status(204).send({
            success : true,
            msg : "Campos borrado."
        })
    }).catch(error => res.status(404).send({success: false, msg: error}));
}

clientesController.getClientById = function (req, res) {
  let clientId = req.params.clientId;

  const sql = `SELECT * FROM clientes LEFT JOIN camposextras AS Extra ON (id_cliente = clientes.id) WHERE clientes.id = ${clientId} ` ;

  db.sequelize.query(sql, {model: clientes}).then((client) => {
      res.json({success: true, msg: client})
    })
    .catch(err => {
      res.json({success: false, msg: err})
    })
}

clientesController.getClientTypes = function (req, res) {
  const sql = 'SELECT * FROM tipoclientes;'

  db.sequelize
    .query(sql, {type: db.sequelize.QueryTypes.SELECT})
    .then((types) => {
      res.json({success: true, msg: types})
    })
    .catch(err => {
      res.json({success: false, msg: err})
    })
}

clientesController.getClientType = function (req, res) {
  const sql = 'SELECT * FROM tipoclientes WHERE id = :typeId;'

  db.sequelize
    .query(sql, {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        typeId: req.params.typeId
      }
    })
    .then((types) => {
      res.json({success: true, msg: types})
    })
    .catch(err => {
      res.json({success: false, msg: err})
    })
}

clientesController.editClientType = function (req, res) {
  const discount = req.body.discount
  const name = req.body.name
  const typeId = req.params.typeId
  const sql = 'UPDATE tipoclientes SET descuento = :descuento, nombre = :nombre WHERE id = :typeId;'

  return db.sequelize
    .query(sql,
      {
        type: db.sequelize.QueryTypes.UPDATE,
        replacements: {
          descuento: discount,
          nombre: name,
          typeId: typeId
        }
      })
    .then((type) => {
      res.json({success: true, msg: type})
    })
    .catch(err => {
      res.json({success: false, msg: err})
    })
}

clientesController.addClientType = function (req, res) {
  const name = req.body.name
  const discount = req.body.discount * 1
  const created = new Date()
  const updated = new Date()

  const sql = 'INSERT INTO tipoclientes VALUES (DEFAULT, :discount, :name, :created, :updated);'

  return db.sequelize
    .query(sql,
      {
        type: db.sequelize.INSERT,
        replacements: {
          name: name,
          discount: discount,
          created: created,
          updated: updated
        }
      })
    .then((clientType) => {
      res.json({success: true, msg: clientType})
    })
    .catch(err => {
      res.json({success: false, msg: err})
    })
}

clientesController.deleteClientType = function (req, res) {
  const typeId = req.params.typeId

  const sql = `DELETE FROM tipoclientes WHERE id = :typeId;`

  return db.sequelize
    .query(sql,
      {
        type: db.sequelize.DELETE,
        replacements: {
          typeId: typeId
        }
      })
      .then(() => {
        res.json({success: true, msg: 'Tipo de cliente eliminado'})
      })
      .catch((err) => {
        res.json({success: false, msg: err})
      })
}
module.exports = clientesController;
