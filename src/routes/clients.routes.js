const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients.controller.js');

// 1. Importando o nosso Middleware (o "segurança")
const verifyToken = require('../middlewares/auth.middleware.js');

// 2. Colocando o verifyToken no meio de TODAS as rotas
// Rota GET: Chama a função que lista os clientes
router.get('/', verifyToken, clientsController.listClients);

// Rota POST: Chama a função que cria um novo cliente
router.post('/', verifyToken, clientsController.createClient);

// Rota PUT: Atualiza um cliente específico pelo ID
router.put('/:id', verifyToken, clientsController.updateClient);

// Rota DELETE: Deleta um cliente específico pelo ID
router.delete('/:id', verifyToken, clientsController.deleteClient);

module.exports = router;