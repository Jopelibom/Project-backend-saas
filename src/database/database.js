const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path'); // Importa a ferramenta de caminhos do Node.js

// Função para conectar ao banco de dados
async function connectDB() {
    return open({
        // __dirname garante que o arquivo nasça EXATAMENTE dentro da pasta database/
        filename: path.join(__dirname, 'database.db'), 
        driver: sqlite3.Database
    });
}

module.exports = connectDB;