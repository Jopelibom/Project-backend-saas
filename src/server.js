// Importa o Express que instalamos
const express = require('express');

// Inicializa o aplicativo
const app = express();

// Define a porta onde o servidor vai rodar
const PORT = 3000;

// Middleware essencial: diz ao Express para entender requisições em formato JSON
app.use(express.json());

// Primeira Rota de Teste (Método GET)
app.get('/', (req, res) => {
    res.json({ 
        status: 'Sucesso!',
        mensagem: 'O servidor do SaaS está rodando perfeitamente!' 
    });
});

// Liga o servidor na porta definida
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});