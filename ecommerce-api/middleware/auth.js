const jwt = require("jsonwebtoken");
const { SELLER, BUYER } = require("../constant/role");

function checkAuthentication(req, res, next) {
  let token = req.headers.authorization?.replaceAll("Bearer ", "");

  if (token) {
    try {
      const decodedUser = jwt.verify(token, "yourSecreteSignature");

      req.user = decodedUser;
      return next();
    } catch (err) {
      /*  if there is error in jwt token from client..
          let leave it as it is and our below code will handle.
      */
    }
  }

  return res.status(401).send({
    msg: "unauthenticated",
  });
}

const isSeller = (req, res, next) => {
  if (req.user.role === SELLER) {
    return next();
  }
  res.status(403).send({
    msg: "only for seller",
  });
};

const isBuyer = (req, res, next) => {
  if (req.user.role === BUYER) {
    return next();
  }
  res.status(403).send({
    msg: "only for buyer",
  });
};

module.exports = {
  checkAuthentication,
  isSeller,
  isBuyer,
};
