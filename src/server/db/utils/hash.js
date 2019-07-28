const crypto = require('crypto');

const secret = 'abadsecret';
const hash = (password) => crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');

module.exports = hash;