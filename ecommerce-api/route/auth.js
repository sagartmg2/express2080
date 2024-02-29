const { signup } = require("../controller/auth");

const express = require("express");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", signup);

module.exports = router;
