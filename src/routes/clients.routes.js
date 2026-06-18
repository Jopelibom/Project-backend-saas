const express = require('express');
const router = express.Router();

// Importa o Controller 
const clientsController = require('../controllers/clients.controller.js');

// Rota GET: Chama a função que lista os clientes
router.get('/', clientsController.listClients);

// Rota POST: Chama a função que cria um novo cliente
router.post('/', clientsController.createClient);

module.exports = router;