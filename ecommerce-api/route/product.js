const express = require("express");

const {
  fetchProducts,
  storeProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");
const { checkAuthentication, isSeller } = require("../middleware/auth");
const Joi = require("joi");
const checkValidationSchmea = require("../middleware/checkValidationSchmea");

const router = express.Router();

const storeProductValidationSchema = Joi.object({
  image: Joi.object({
    size: Joi.number()
      .max(2 * 1024 * 1024)
      .messages({
        "number.max": "file must be less than 2mb ",
      }),
    mimetype: Joi.string().valid(
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg",
      "image/webp"
    ),
  }),
  title: Joi.required(),
  price: Joi.number().required().min(0),
});


router.get("", fetchProducts);
router.post(
  "",
  checkAuthentication,
  isSeller,
  checkValidationSchmea(storeProductValidationSchema),
  storeProduct
);

router.put("/:_id", checkAuthentication, updateProduct);
router.delete("/:_id", deleteProduct);

module.exports = router;
