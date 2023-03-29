const constants = require('../constants');

const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : constants.DEV_JWT;

console.log(process.env.NODE_ENV ?? 'environment is not specified, running dev');

module.exports = { JWT_SECRET, ...constants };
