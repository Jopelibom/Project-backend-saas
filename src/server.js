// Importa o Express que instalamos
const express = require('express');

// IMPORTANTE: Importa o arquivo de rotas que você criou
const clientsRoutes = require('./routes/clients.routes.js'); 

// Inicializa o aplicativo
const app = express();

// Define a porta onde o servidor vai rodar
const PORT = 3000;

// Middleware essencial: diz ao Express para entender requisições em formato JSON
app.use(express.json());

// Primeira Rota de Teste (Método GET) na URL raiz
app.get('/', (req, res) => {
    res.json({ 
        status: 'Sucesso!',
        mensagem: 'O servidor do SaaS está rodando perfeitamente!' 
    });
});

// IMPORTANTE: Diz ao Express: "Toda vez que a URL começar com /clients, use este arquivo de rotas"
app.use('/clients', clientsRoutes);

// Liga o servidor na porta definida
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});