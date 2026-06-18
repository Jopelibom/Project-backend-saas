// Importa a conexão com o banco de dados
const connectDB = require('../database/database.js');

// Função para CRIAR um cliente (POST)
async function createClient(req, res) {
    try {
        // Pega os dados que o usuário enviou
        const { name, email, phone } = req.body;

        // Conecta com o banco
        const db = await connectDB();

        // Insere o cliente na tabela
        // Os pontos de interrogação (?) são uma medida de segurança contra ataques
        const result = await db.run(
            'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)',
            [name, email, phone]
        );

        res.status(201).json({
            message: "Cliente criado com sucesso!",
            clientId: result.lastID
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar cliente. Verifique os dados." });
    }
}

// Função para LISTAR os clientes (GET)
async function listClients(req, res) {
    try {
        const db = await connectDB();
        
        // Pega todos os clientes da tabela
        const clients = await db.all('SELECT * FROM clients');

        res.json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar clientes." });
    }
}

// Exporta as funções para serem usadas nas rotas
module.exports = {
    createClient,
    listClients
};