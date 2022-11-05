const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

// function validateEmail(req, res, next) {
//     const { email, password } = req.body;
// }

module.exports = {
    generateToken,
};