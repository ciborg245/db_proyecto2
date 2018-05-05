const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes');



router.get('/', function(req, res) {res.send("welcome")});

router.post('/createUser', clientesController.createCliente);

router.post('/updateUser', clientesController.updateCliente);


module.exports = router;
