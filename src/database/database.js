const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

// Função para conectar ao banco de dados
async function connectDB() {
    return open({
        filename: './src/database/database.db', // O arquivo do banco será criado aqui
        driver: sqlite3.Database
    });
}

module.exports = connectDB;