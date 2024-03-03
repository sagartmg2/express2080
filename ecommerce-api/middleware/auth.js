const jwt = require("jsonwebtoken");
function checkAuthentication(req, res, next) {

  let token = req.headers.authorization?.replaceAll("Bearer ", "");

  if (token) {
    const decodedUser = jwt.verify(token, "shhhhh");
    req.user = decodedUser
    return next();
  }
  
  return res.status(401).send({
    msg: "unauthorized.",
  });
}

module.exports = {
  checkAuthentication,
};
