const { isCelebrateError } = require('celebrate');
const { InvalidRequest } = require('../customErrors');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const msg = err.details.get('body') ?? 'validation error';
    return next(new InvalidRequest(msg));
  }

  return next(err);
};
