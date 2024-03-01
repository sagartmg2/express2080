const Joi = require("joi");
const User = require("../model/User");
const bcrypt = require("bcrypt");

/* 
     1. client side validation 
     2. server side 
     3. database side 
*/

const signupValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const signup = async (req, res, next) => {
  try {
    await signupValidationSchema.validateAsync(req.body, {
      allowUnknown: true,
      abortEarly: false,
    });
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

  /* email validation  */
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("email already exits.");
  }

  try {
    let hashed = await bcrypt.hash(req.body.password, 10);
    /* spread operator */
    let user = await User.create({ ...req.body, password: hashed });
    user.password = undefined;
    // user = user.toObject()
    // delete user.password;

    res.send(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  /* server side validation for login  */
  res.send({
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  })
return
  let user = await User.findOne({ email: req.body.email }); // null

  if (user) {
    /* check password */
  }

  res.status(401).send("invalid credentails");
};

module.exports = {
  signup,
  login,
};
