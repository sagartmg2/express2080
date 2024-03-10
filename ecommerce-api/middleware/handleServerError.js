module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errors = null;
  let msg = err.msg || "Server Error";

  if (err.name == "ValidationError") {
    msg = "Bad Request / Validation Error";
    statusCode = 400;
    let errsArray = Object.entries(err.errors);
    errors = [];

    errsArray.forEach((el) => {
      errors.push({
        field: el[0],
        msg: el[1].message,
      });
    });
  }

  res.status(statusCode).send({
    msg,
    errors,
    stack: err.stack,
  });
};
