const crypto = require('crypto');

//TODO: Salt the password before hashing
//const salt = process.env.SALT || 'notSoSecretSaltSecret';
const secret = process.env.HASH_SECRET || 'aBadCryptoSecret';

const hash = (password) => crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');

module.exports = hash;