const constants = require('../constants');

const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : constants.DEV_JWT;

const { CLIENT_NAME = 'http://localhost:5173' } = process.env;

console.log(process.env.NODE_ENV ?? 'environment is not specified, running dev');
console.log(`host name ${CLIENT_NAME}`);

module.exports = { JWT_SECRET, CLIENT_NAME };
