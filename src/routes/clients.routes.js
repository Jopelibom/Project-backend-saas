const express = require('express');
const router = express.Router();

// Rota GET: Para listar clientes
router.get('/', (req, res) => {
    res.json({ message: "Esta rota vai listar todos os clientes no futuro!" });
});

// Rota POST: Para cadastrar um novo cliente
router.post('/', (req, res) => {
    const clientData = req.body;
    
    res.json({ 
        message: "Cliente recebido com sucesso!", 
        data: clientData 
    });
});

module.exports = router;