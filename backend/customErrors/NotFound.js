class NotFound extends Error {
  constructor(msg) {
    super(msg);
    this.status = 404;
  }
}

module.exports = { NotFound };
