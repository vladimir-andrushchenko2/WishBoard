const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../environment');
const { UnauthorizedError } = require('../customErrors');

module.exports = (req, res, next) => {
  if (!req.cookies?.jwt) {
    return next(new UnauthorizedError('Problem with the jwt token'));
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Problem with the jwt token'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
