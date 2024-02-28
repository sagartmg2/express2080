const { signup } = require("../controller/auth");

const express = require("express");
const router = express.Router();

router.post("/signup", signup);

module.exports = router;
