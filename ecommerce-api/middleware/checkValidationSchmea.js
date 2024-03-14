const checkValidationSchmea = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(
        { ...req.body, ...req.files },
        {
          allowUnknown: true,
          abortEarly: false,
        }
      );
      next();
    } catch (err) {
      return res.status(400).send({
        msg: "validation error",
        errors: err.details.map((el) => {
          return {
            field: el.context.key,
            msg: el.message,
          };
        }),
      });
    }
  };
};

module.exports = checkValidationSchmea;
