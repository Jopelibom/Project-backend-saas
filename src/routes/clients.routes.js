const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients.controller.js');

// Rota GET: Chama a função que lista os clientes
router.get('/', clientsController.listClients);

// Rota POST: Chama a função que cria um novo cliente
router.post('/', clientsController.createClient);

// Rota PUT: Atualiza um cliente específico pelo ID
router.put('/:id', clientsController.updateClient);

// Rota DELETE: Deleta um cliente específico pelo ID
router.delete('/:id', clientsController.deleteClient);

module.exports = router;