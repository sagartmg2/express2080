const Product = require("../model/Product");

const fetchProducts = async (req, res) => {
  let products = await Product.find();
  res.send(products);
};

const storeProduct = async (req, res, next) => {
  try {
    let product = await Product.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res) => {
  res.send(`${req.params._id} product updated`);
};

const deleteProduct = async (req, res) => {
  res.send("product deleted");
};

/* named exports */
module.exports = {
  fetchProducts: fetchProducts,
  storeProduct,
  updateProduct,
  deleteProduct,
};
