const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/services.controller.js');

// 1. Importando o nosso Middleware (o "segurança")
const verifyToken = require('../middlewares/auth.middleware.js');

// 2. Colocando o verifyToken no meio de TODAS as rotas
// Rota GET: Lista os serviços
router.get('/', verifyToken, servicesController.listServices);

// Rota POST: Cria um novo serviço
router.post('/', verifyToken, servicesController.createService);

// Rota PUT: Atualiza um serviço específico pelo ID
router.put('/:id', verifyToken, servicesController.updateService);

// Rota DELETE: Deleta um serviço específico pelo ID
router.delete('/:id', verifyToken, servicesController.deleteService);

module.exports = router;