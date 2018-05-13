const productos = require('../models').productos;
const db = require('../models/index');

var productosController = {};

//Función para editar un Producto
productosController.updateProducto = function(req, res) {
    //Se empieza a construir el query de UPDATE con la información del body de la request
    let query = "UPDATE productos SET ";
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
        + ` WHERE id = ${req.params.productId};`;

    //Se realiza el query
    db.sequelize.query(query).spread((results, metadata) => {
        res.status(200).send({
            success : true,
            msg : "Producto actualizado."
        })
    }).catch(error => res.send({success: false, msg: error}));
}

//Función para borrar un Producto
productosController.deleteProducto = function(req, res) {
    //Se construye el query
    let query = `DELETE FROM productos WHERE id = ${req.params.productId}`;

    //Se realiza el query
    db.sequelize.query(query).spread((results, metadata) => {
        res.status(204).send({
            success : true,
            msg : "Producto borrado."
        })
    }).catch(error => res.status(404).send({success: false, msg: error}));
}

//Función para recuperar una cantidad X de registros de la base de datos
productosController.getProductos = function(req, res) {
    //Se empieza a construir el query
    let query = `SELECT * FROM productos`;

    //Se agrega un ORDER BY, un LIMIT y un OFFSET
    if (req.query.orderby) {
        query += ` ORDER BY ${req.query.orderby} `
    } else {
      query += ` ORDER BY id `
    }

    query += ` LIMIT 25 `;

    if (req.query.offset) {
        query += ` OFFSET ${req.query.offset} `
    }

    //Se realiza el query
    db.sequelize.query(query, {model: productos}).then(rows => {
        res.status(200).send({
            success: true,
            msg: rows
        })
    }).catch(error => res.status(404).send({success: false, msg: error}));
}

productosController.newProduct = function (req, res) {
  const productName = req.body.name
  const price = req.body.price * 1
  const category = req.body.category

  const sql = `INSERT INTO productos VALUES (DEFAULT, :productName, :price, :category, :created, :updated)`

  return db.sequelize
    .query(sql, {
      type: db.sequelize.QueryTypes.INSERT,
      replacements:  {
        productName: productName,
        price: price,
        category: category,
        created: new Date(),
        updated: new Date()
      }
    })
    .then((product) => {
      res.json({success: true, msg: product})
    })
    .catch(error => {
      res.json({success: false, msg: error})
    })
}

productosController.getProductById = function (req, res) {
  const productId = req.params.productId

  const sql = `SELECT * FROM productos WHERE id = :productId`

  return db.sequelize
    .query(sql, {
      type: db.sequelize.QueryTypes.SELECT,
      replacements: {
        productId: productId
      }
    })
    .then((product) => {
      res.json({success: true, msg: product})
    })
    .catch(err => {
      res.json({success: false, msg: err})
    })
}


module.exports = productosController;
