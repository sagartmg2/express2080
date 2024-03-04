module.exports = (err, req, res, next) => {
  let statusCode = 500;
  let errors = null;
  let msg = "Server Error";

  if (err.name == "ValidationError") {
    msg = "Bad Request / Validation Error";
    statusCode = 400;
    console.log(Object.entries(err.errors))
    errors = [
      {
        msg: "validatio error",
        errors: [{ field: "email", msg: "already used" }],
      },
    ];
  }

  res.status(statusCode).send({
    msg,
    errors,
    stack: err.stack,
  });
};
