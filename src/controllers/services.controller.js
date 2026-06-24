const connectDB = require('../database/database.js');

// Função para CRIAR um serviço (POST)
async function createService(req, res) {
    try {
        const { name, price, duration } = req.body;

        const db = await connectDB();
        const result = await db.run(
            'INSERT INTO services (name, price, duration) VALUES (?, ?, ?)',
            [name, price, duration]
        );

        res.status(201).json({
            message: "Serviço criado com sucesso!",
            serviceId: result.lastID
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar serviço." });
    }
}

// Função para LISTAR os serviços (GET)
async function listServices(req, res) {
    try {
        const db = await connectDB();
        const services = await db.all('SELECT * FROM services');
        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar serviços." });
    }
}

// Função para ATUALIZAR um serviço (PUT)
async function updateService(req, res) {
    try {
        const { id } = req.params; // Pega o ID da URL
        const { name, price, duration } = req.body; // Pega os novos dados enviados

        const db = await connectDB();

        const result = await db.run(
            'UPDATE services SET name = ?, price = ?, duration = ? WHERE id = ?',
            [name, price, duration, id]
        );

        if (result.changes === 0) {
            return res.status(404).json({ message: "Serviço não encontrado." });
        }

        res.json({ message: "Serviço atualizado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar serviço." });
    }
}

// Função para DELETAR um serviço (DELETE)
async function deleteService(req, res) {
    try {
        const { id } = req.params;

        const db = await connectDB();

        const result = await db.run('DELETE FROM services WHERE id = ?', [id]);

        if (result.changes === 0) {
            return res.status(404).json({ message: "Serviço não encontrado." });
        }

        res.json({ message: "Serviço deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar serviço." });
    }
}

module.exports = {
    createService,
    listServices,
    updateService,
    deleteService
};