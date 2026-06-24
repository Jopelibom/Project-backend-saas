const jwt = require('jsonwebtoken');

// A MESMA chave secreta usada no users.controller.js
const SECRET = 'minha_chave_secreta_super_segura';

// Função de segurança (Middleware)
function verifyToken(req, res, next) {
    // 1. Pega o token que o usuário enviou no "cabeçalho" (header) da requisição
    const tokenHeader = req.headers['authorization'];

    // Se o usuário não enviou nenhum token (não está logado)
    if (!tokenHeader) {
        return res.status(403).json({ message: "Acesso negado. Nenhum token fornecido." });
    }

    // O token geralmente vem escrito assim: "Bearer dhi2u3hiu2hi3..."
    // Nós cortamos a palavra "Bearer " para pegar só o código do token
    const token = tokenHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Acesso negado. Token em formato inválido." });
    }

    try {
        // 2. O segurança confere se o crachá é verdadeiro usando a chave secreta
        const decoded = jwt.verify(token, SECRET);

        // Se for verdadeiro, ele anota quem é o usuário e deixa ele passar
        req.user = decoded; 
        
        // O comando "next()" é o segurança abrindo a porta para a rota continuar
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Token inválido ou expirado. Faça login novamente." });
    }
}

module.exports = verifyToken;