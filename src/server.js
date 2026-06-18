const express = require('express');
const clientsRoutes = require('./routes/clients.routes.js'); 
const connectDB = require('./database/database.js'); 

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 
        status: 'Sucesso!',
        message: 'O servidor do SaaS está rodando perfeitamente!' 
    });
});

app.use('/clients', clientsRoutes);

// Função que inicia o banco e depois liga o servidor
async function startServer() {
    try {
        const db = await connectDB();
        
        // Cria a tabela "clients" caso ela não exista
        await db.exec(`
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT
            )
        `);
        console.log("📦 Banco de dados conectado e tabelas prontas!");

        // Liga o servidor só depois que o banco estiver pronto
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Erro ao iniciar o servidor:", error);
    }
}

// Executa a função
startServer();