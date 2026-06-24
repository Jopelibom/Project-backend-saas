const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller.js');

// Rota de Cadastro
router.post('/register', usersController.registerUser);

// Rota de Login
router.post('/login', usersController.loginUser);

module.exports = router;