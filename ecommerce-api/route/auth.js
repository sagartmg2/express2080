const { signup,login } = require("../controller/auth");

const express = require("express");
const { checkAuthentication } = require("../middleware/auth");
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
