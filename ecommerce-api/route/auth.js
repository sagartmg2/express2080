const { signup, login } = require("../controller/auth");

const express = require("express");
const { checkAuthentication } = require("../middleware/auth");
const Joi = require("joi");
const checkValidationSchmea = require("../middleware/checkValidationSchmea");
const router = express.Router();

const signupValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  role: Joi.string().valid("buyer", "seller").required(),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

router.post("/signup", checkValidationSchmea(signupValidationSchema), signup);
router.post("/login", checkValidationSchmea(loginValidationSchema), login);

module.exports = router;


