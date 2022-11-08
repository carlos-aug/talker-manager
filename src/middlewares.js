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

function validateToken(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

    if (authorization.length < 16) return res.status(401).json({ message: 'Token inválido' });
   
    next();
}

function validateName(req, res, next) {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

    if (name.length < 3) { 
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}
    next();
}   

function validateAge(req, res, next) {
    const { age } = req.body;

    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

    if (Number(age) < 18) { 
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
}

    next();
} 

function validateTalk(req, res, next) {
    const { talk } = req.body;

    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

     next();
}

function validateWatchedAt(req, res, next) {
    const { talk: { watchedAt } } = req.body;
    const validateRegexWatchedAt = /(\d{2})\/?(\d{2})?\/(\d{4})/;

    if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });

    if (!validateRegexWatchedAt.test(watchedAt)) { 
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }

    next();
}

function validateRate(req, res, next) {
    const { talk: { rate } } = req.body;

    if (!('rate' in req.body.talk)) {
 return res.status(400)
        .json({ message: 'O campo "rate" é obrigatório' }); 
}

    if (Number(rate) < 1 || Number(rate) > 5 || !Number.isInteger(rate)) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

    return next();
}

module.exports = {
    generateToken,
    validateEmailAndPassword,
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateWatchedAt,
    validateRate,
};