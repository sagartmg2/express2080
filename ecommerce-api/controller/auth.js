const Joi = require("joi");
const User = require("../model/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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
    return res.status(400).send({
      msg: "validatio error",
      errors: [{ field: "email", msg: "already used" }],
    });
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

  let user = await User.findOne({ email: req.body.email }); // null

  if (user) {
    let matched = await bcrypt.compare(req.body.password, user.password);

    if (matched) {
      user = user.toObject();
      user.password = undefined;

      const token = jwt.sign(user, "shhhhh");

      return res.send({ token });
    }
  }

  res.status(401).send({
    msg: "invalid credentials",
  });
};

module.exports = {
  signup,
  login,
};
