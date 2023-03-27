const constants = require('../constants');

const JWT_SECRET = process.env.JWT_SECRET ?? constants.DEV_JWT;

module.exports = { JWT_SECRET, ...constants };
