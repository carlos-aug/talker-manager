const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function validateEmailAndPassword(req, res, next) {
    const { email, password } = req.body;
    const validateEmail = /\S+@\S+\.\S+/;

    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

    if (!validateEmail.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    return next();
}

module.exports = {
    generateToken,
    validateEmailAndPassword,
};