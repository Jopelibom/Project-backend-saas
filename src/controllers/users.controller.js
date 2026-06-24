const connectDB = require('../database/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Chave secreta para assinar o Token (Em projetos reais, isso fica escondido em variáveis de ambiente)
const SECRET = 'minha_chave_secreta_super_segura';

// Função para CADASTRAR usuário
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // Criptografa a senha (o número 10 é o nível de complexidade da criptografia)
        const hashedPassword = await bcrypt.hash(password, 10);

        const db = await connectDB();
        
        const result = await db.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao cadastrar. O email já pode estar em uso." });
    }
}

// Função para fazer LOGIN
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const db = await connectDB();

        // 1. Busca o usuário pelo email
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        
        // Se o usuário não existir
        if (!user) {
            return res.status(401).json({ message: "Email ou senha incorretos." });
        }

        // 2. Compara a senha digitada com a senha criptografada do banco
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        // Se a senha estiver errada
        if (!isValidPassword) {
            return res.status(401).json({ message: "Email ou senha incorretos." });
        }

        // 3. Gera o Token JWT (O "crachá" virtual que dura 1 hora)
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

        res.json({ 
            message: "Login realizado com sucesso!", 
            token: token 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao fazer login." });
    }
}

module.exports = { registerUser, loginUser };