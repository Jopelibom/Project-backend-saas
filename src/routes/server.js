const express = require('express');
// Importa o arquivo de rotas que você acabou de criar
const clientsRoutes = require('./routes/clients.routes.js'); 

const app = express();
const PORT = 3000;

app.use(express.json());

// Diz ao Express: "Toda vez que a URL começar com /clients, use este arquivo"
app.use('/clients', clientsRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});