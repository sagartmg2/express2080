const bcrypt = require("bcrypt")

function signupOld(username, email, password) {
  bcrypt.hash(password, 10, function (err, hash) {
    let data = {
      username: username,
      email, // if key value same, use only key
      password: hash,
    };
    console.log("storein DB:", data);
  });
}

function loginOld(username, email, password) {
  let hash = "$2b$10$Fpma8gRVtocuGqul4tLokekGGONRu9HfmwDFGFQzLocdMCAzz3dZa";

  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      console.log("login scucess");
    } else {
      console.log("invalid.....");
    }
  });
}


const login  = () =>{
    console.log("login");
}
const signup  = () =>{
    console.log("signup");
}


/* common js  */
/* default export : only one default export per module / js file */
/* 
module.exports = signup
module.exports = login  // this will repalce above code
*/

/* named export */
module.exports = {
    "login": login,
    "signup": signup,
}