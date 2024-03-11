const express = require("express");
const { createOrder } = require("../controller/order");

const router = express.Router();

router.post("", createOrder);

module.exports = router;
