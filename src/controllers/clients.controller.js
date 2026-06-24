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

// Função para ATUALIZAR um cliente (PUT)
async function updateClient(req, res) {
    try {
        const { id } = req.params; // Pega o ID que vem na URL (ex: /clients/1)
        const { name, email, phone } = req.body; // Pega os novos dados que o usuário enviou

        const db = await connectDB();

        // O comando UPDATE altera os dados onde o id for igual ao informado
        const result = await db.run(
            'UPDATE clients SET name = ?, email = ?, phone = ? WHERE id = ?',
            [name, email, phone, id]
        );

        // Se nenhuma linha foi alterada, significa que o ID não existe
        if (result.changes === 0) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }

        res.json({ message: "Cliente atualizado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar cliente." });
    }
}

// Função para DELETAR um cliente (DELETE)
async function deleteClient(req, res) {
    try {
        const { id } = req.params; // Pega o ID da URL

        const db = await connectDB();

        // O comando DELETE apaga a linha onde o id for igual ao informado
        const result = await db.run('DELETE FROM clients WHERE id = ?', [id]);

        if (result.changes === 0) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }

        res.json({ message: "Cliente deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar cliente." });
    }
}

// Exporta as funções para serem usadas nas rotas
module.exports = {
    createClient,
    listClients,
    updateClient,
    deleteClient
};

