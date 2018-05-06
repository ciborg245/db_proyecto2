const express = require('express')
const router = express.Router()
const clientesController = require('../controllers/clientes')
const productosController = require('../controllers/productos')
const sucursalesController = require('../controllers/sucursales')
const departamentosController = require('../controllers/departamentos')

router.get('/', function(req, res) {res.send("welcome")});

//Rutas para Clientes
router.post('/createCliente', clientesController.createCliente)
router.get('/getClientes/:orderby/:offset', clientesController.getClientes)
router.put('/updateCliente', clientesController.updateCliente)
router.delete('/deleteCliente', clientesController.deleteCliente)

//Rutas para Productos
router.get('/getProductos/:orderby/:offset', productosController.getProductos)
router.put('/updateProducto', productosController.updateProducto)
router.delete('/deleteProducto', productosController.deleteProducto)
//
// //Rutas para Sucursales
router.get('/getSucursales/:orderby/:offset', sucursalesController.getSucursales)
router.put('/updateSucursal', sucursalesController.updateSucursal)
router.delete('/deleteSucursal', sucursalesController.deleteSucursal)
//
// //Rutas para Departamentos
router.get('/getDepartamentos/:orderby/:offset', departamentosController.getDepartamentos)
router.put('/updateDepartamento', departamentosController.updateDepartamento)
router.delete('deleteDepartamento', departamentosController.deleteDepartamento)

module.exports = router;
