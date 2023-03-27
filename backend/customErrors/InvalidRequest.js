class InvalidRequest extends Error {
  constructor(msg) {
    super(msg);
    this.status = 400;
  }
}

module.exports = { InvalidRequest };
