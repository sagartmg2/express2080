const Joi = require("joi");
const User = require("../model/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

/* 
     1. client side validation 
     2. server side ( joi validation) 
     3. database side 
*/



const signup = async (req, res, next) => {
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

/*  stateful - session/cookie */
/*  stateless - json */

const login = async (req, res) => {
  /* server side validation for login  */

  let user = await User.findOne({ email: req.body.email }).select('+password'); // null

  if (user) {
    let matched = await bcrypt.compare(req.body.password, user.password);

    if (matched) {
      user = user.toObject();
      user.password = undefined;

      const token = jwt.sign(user, process.env.JWT_SECRET,{expiresIn:"7d"});
      return res.send({ token, user });
    }
  }

  res.status(401).send({
    msg: "invalid credentials",
  });
};

const logout = () =>{
  /* token ..  */

}

module.exports = {
  signup,
  login,
};
