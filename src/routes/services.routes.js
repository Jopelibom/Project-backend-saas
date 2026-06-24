const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/services.controller.js');

// Rota GET: Lista os serviços
router.get('/', servicesController.listServices);

// Rota POST: Cria um novo serviço
router.post('/', servicesController.createService);

// Rota PUT: Atualiza um serviço específico pelo ID
router.put('/:id', servicesController.updateService);

// Rota DELETE: Deleta um serviço específico pelo ID
router.delete('/:id', servicesController.deleteService);

module.exports = router;