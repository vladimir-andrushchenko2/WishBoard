module.exports = (err, req, res, _next) => {
  const { status = 500, message } = err;

  return res
    .status(status)
    .send({
      message: status === 500
        ? 'Server Error'
        : message,
    });
};
