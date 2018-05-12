const express = require('express')
const router = express.Router()
const clientesController = require('../controllers/clientes')
const productosController = require('../controllers/productos')
const sucursalesController = require('../controllers/sucursales')
const departamentosController = require('../controllers/departamentos')

router.get('/', function(req, res) {res.send("welcome")});

//Rutas para Clientes
router.post('/clients', clientesController.createCliente)
router.get('/clients', clientesController.getClientes)
router.get('/clients/:clientId', clientesController.getClientById)
router.put('/clients/:clientId/edit', clientesController.updateCliente)
router.delete('/clients/:clientId', clientesController.deleteCliente)
router.get('/clientTypes', clientesController.getClientTypes)
//Rutas para Productos
router.get('/products', productosController.getProductos)
router.get('/products/:productId', productosController.getProductById)
router.post('/products', productosController.newProduct)
router.put('/products/:productId/edit', productosController.updateProducto)
router.delete('/deleteProducto', productosController.deleteProducto)
//
// //Rutas para Sucursales
router.get('/stores', sucursalesController.getSucursales)
router.put('/updateSucursal', sucursalesController.updateSucursal)
router.delete('/deleteSucursal', sucursalesController.deleteSucursal)
//
// //Rutas para Departamentos
router.get('/states', departamentosController.getDepartamentos)
router.put('/updateDepartamento', departamentosController.updateDepartamento)
router.delete('/deleteDepartamento', departamentosController.deleteDepartamento)

module.exports = router;
