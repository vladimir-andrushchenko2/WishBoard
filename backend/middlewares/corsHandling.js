const { InvalidRequest } = require('../customErrors/InvalidRequest');
const { CLIENT_NAME } = require('../environment');

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  if (!origin) {
    return next(new InvalidRequest('no origin header'));
  }

  if (origin.startsWith(CLIENT_NAME)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;

  // this is for preflight requests
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // respond
    return res.end();
  }

  return next();
};
