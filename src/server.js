const express = require('express');
const connectDB = require('./database/database.js'); 

// 1. Importações das Rotas
const clientsRoutes = require('./routes/clients.routes.js'); 
const servicesRoutes = require('./routes/services.routes.js');
const usersRoutes = require('./routes/users.routes.js'); 

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: 'Sucesso!', message: 'O servidor do SaaS está rodando perfeitamente!' });
});

// 2. Uso das Rotas
app.use('/clients', clientsRoutes);
app.use('/services', servicesRoutes);
app.use('/users', usersRoutes); // <-- Avisando o Express da nova rota de usuários

// Função que inicia o banco e o servidor
async function startServer() {
    try {
        const db = await connectDB();
        
        // NOVA Tabela de Usuários (Para o dono do negócio acessar o sistema)
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);

        // Tabela de Clientes
        await db.exec(`
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT
            )
        `);

        // Tabela de Serviços
        await db.exec(`
            CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                duration INTEGER NOT NULL
            )
        `);

        console.log("📦 Banco de dados conectado e tabelas prontas!");

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Erro ao iniciar o servidor:", error);
    }
}

startServer();