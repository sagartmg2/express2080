const express = require("express");

const {
  fetchProducts,
  storeProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");

const router = express.Router();

router.get("", fetchProducts);
router.post("", storeProduct);
router.put("/:_id", updateProduct);
router.delete("/:_id", deleteProduct);

module.exports = router;
