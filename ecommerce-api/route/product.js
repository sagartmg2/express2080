const express = require("express");

const {
  fetchProducts,
  storeProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");

const router = express.Router();

router.get("/api/products", fetchProducts);
router.post("/api/products", storeProduct);
router.put("/api/products/:_id", updateProduct);
router.delete("/api/products/:_id", deleteProduct);

module.exports = router;
