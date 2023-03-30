const { NotFound } = require('./NotFound');
const { InvalidRequest } = require('./InvalidRequest');
const { UnauthorizedError } = require('./UnauthorizedError');
const { DuplicateError } = require('./DuplicateError');
const { ForbiddenError } = require('./ForbiddenError');

module.exports = {
  NotFound,
  InvalidRequest,
  UnauthorizedError,
  DuplicateError,
  ForbiddenError,
};
