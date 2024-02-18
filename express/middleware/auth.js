let loggedIn = true;
let hasValidRole = true

function checkAuthentication(req, res, next) {
    if (!loggedIn) {
      return res.status(401).send();
    }
    next()
  }
  
  function checkValidRole(req,res,next){
      if(!hasValidRole){
          return res.status(403).send()
      }
      next()
  }

  module.exports = {
    checkAuthentication,
    checkValidRole
  }