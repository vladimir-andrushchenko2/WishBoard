class ForbiddenError extends Error {
  constructor(msg) {
    super(msg);
    this.status = 403;
  }
}

module.exports = { ForbiddenError };
