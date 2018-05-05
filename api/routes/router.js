const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes');


router.get('/', function(req, res) {res.send("welcome")});

//Rutas de clientes
router.post('/createCliente', clientesController.createCliente)
router.post('/updateCliente', clientesController.updateCliente)
router.post('/deleteCliente', clientesController.deleteCliente)
router.post('/getClientes', clientesController.getClientes)

module.exports = router;
