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
  password: Joi.string().required(),
});

const signup = async (req, res, next) => {
  try {
    await signupValidationSchema.validateAsync(req.body, {
      allowUnknown: true,
      abortEarly: false,
    });
  } catch (err) {
    /* 
    msg: validationerror
    error:{
      name: reqruired.
      email: valid email requred
    }

    errors:[
      {field: name, msg: reqruired,}
      {field: email, msg:valid email}
    ]
    
    */
    return res.status(400).send(err);
  }

  try {
    let hashed = await bcrypt.hash(req.body.password, 10);
    /* spread operator */
    let user = await User.create({ ...req.body, password: hashed });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res) => {
  /* server side validation for login  */

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
