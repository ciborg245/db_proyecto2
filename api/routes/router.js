const express = require('express')
const router = express.Router()
const clientesController = require('../controllers/clientes')
const productosController = require('../controllers/productos')
const sucursalesController = require('../controllers/sucursales')
const departamentosController = require('../controllers/departamentos')
const twitterController = require('../controllers/twitter.server.controller')
const statisticsController = require('../controllers/statistics')

router.get('/', function(req, res) {res.send("welcome")});

//Rutas para Clientes
router.post('/clients', clientesController.createCliente)
router.get('/clients', clientesController.getClientes)
router.get('/clients/:clientId', clientesController.getClientById)
router.put('/clients/:clientId/edit', clientesController.updateCliente)
router.delete('/clients/:clientId', clientesController.deleteCliente)
router.delete('/extrafield/:fieldId', clientesController.deleteExtra)

router.get('/clientTypes', clientesController.getClientTypes)
router.post('/clientTypes', clientesController.addClientType)
router.get('/clientTypes/:typeId', clientesController.getClientType)
router.put('/clientTypes/:typeId', clientesController.editClientType)
router.delete('/clientTypes/:typeId', clientesController.deleteClientType)

//Rutas para Productos
router.get('/products', productosController.getProductos)
router.get('/products/:productId', productosController.getProductById)
router.post('/products', productosController.newProduct)
router.put('/products/:productId/edit', productosController.updateProducto)
router.delete('/products/:productId', productosController.deleteProducto)

// //Rutas para Sucursales
router.get('/stores', sucursalesController.getSucursales)
router.get('/stores/:storeId', sucursalesController.getSucursalById)
router.put('/stores/:storeId/edit', sucursalesController.updateSucursal)
router.delete('/stores/:storeId', sucursalesController.deleteSucursal)

//Rutas para Departamentos
router.get('/states', departamentosController.getDepartamentos)
router.put('/updateDepartamento', departamentosController.updateDepartamento)
router.delete('/deleteDepartamento', departamentosController.deleteDepartamento)

//Rutas para Twitter
router.post('/twitter/name/:screenName', twitterController.createTweetsByScreenName)
router.post('/twitter/id/:twitterId', twitterController.createTweetsByUserId)
router.get('/twitter/tweets', twitterController.getTweets)
router.get('/twitter/:twitterId', twitterController.getTweetsByUserId)
router.get('/twitter/search/:word', twitterController.searchTweets)
router.get('/twitter/search/:twitterId/:word', twitterController.searchTweetsByUserId)
router.get('/twitter/search/:screenName/:word', twitterController.searchTweetsByScreenName)
router.delete('/twitter/:twitterId', twitterController.deleteTweetsByUserId)

//Rutas para las estadisticas
//Graficas
router.get('/favoriteProduct/:gender/:min/:max', statisticsController.favoriteProduct)
router.get('/favoriteCategory/:gender/:min/:max', statisticsController.favoriteCategory)
router.get('/popularState/:gender/:min/:max/:cmin/:cmax', statisticsController.popularState)
router.get('/frequentClientTypes/:gender/:min/:max/:cmin/:cmax', statisticsController.frequentClientTypes)
router.get('/clientsByDate/:interval', statisticsController.clientsByDate)

//Resumenes
router.get('/storesByState', statisticsController.storesByState)
router.get('/creditByState', statisticsController.creditByState)
router.get('/productByState', statisticsController.productByState)
router.get('/productByClientType', statisticsController.productByClientType)
router.get('/productByGender', statisticsController.productByGender)

//Detalle
router.get('/statesReport', statisticsController.statesReport)
router.get('/newClientsByState', statisticsController.newClientsByState)

module.exports = router;
