module.exports = (err, req, res, next) => {
  let statusCode = 500;
  let error = err.name;
  let msg = "Server Error";

  if (err.name == "ValidationError") {
    msg = "Bad Request / Validation Error";
    statusCode = 400;
    error = {
      email: "alerady exists",
      password: "required field",
    };
  }

  res.status(statusCode).send({
    msg,
    error,
  });
};
