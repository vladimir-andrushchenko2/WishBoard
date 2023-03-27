const mongoose = require('mongoose');
const { DuplicateError, InvalidRequest } = require('../customErrors');

/** gets next returns callback */
module.exports = (next) => (err) => {
  if (err instanceof mongoose.CastError) {
    return next(new InvalidRequest(`Invalid ${err.path}: ${err.value}`));
  }

  if (err.name === 'ValidationError') {
    const errMsg = Object.entries(err.errors).map(([key, value]) => `${key} has a ${value.name} with message ${value.message}`).join(' || ');

    return next(new InvalidRequest(errMsg));
  }

  if (err.code === 11000) {
    return next(new DuplicateError('A user with such email already exists'));
  }

  return next(err);
};
