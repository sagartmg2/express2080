const User = require("../model/User");

/* 
     1. client side validation 
     2. server side 
     3. database side 
*/
const signup = async (req, res, next) => {
  try {
    let user = await User.createOld(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
};
