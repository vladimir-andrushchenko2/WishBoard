const { isCelebrateError } = require('celebrate');
const { InvalidRequest } = require('../customErrors');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const bodyError = err.details.get('body') ?? 'validation error';
    const paramsError = err.details.get('params') ?? '';
    return next(new InvalidRequest(`${bodyError} ${paramsError}`));
  }

  return next(err);
};
