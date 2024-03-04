const express = require("express");

const {
  fetchProducts,
  storeProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");
const { checkAuthentication } = require("../middleware/auth");

const router = express.Router();

router.get("", fetchProducts);
router.post("", checkAuthentication, storeProduct);
router.put("/:_id", checkAuthentication, updateProduct);
router.delete("/:_id", deleteProduct);

module.exports = router;
