const path = require("path");

const Product = require("../model/Product");

const fetchProducts = async (req, res) => {
  // req.query.search

  let products = await Product.find({
    title: new RegExp(req.query.search, "i"),
  }).sort({ title: 1 });

  /* 
    fid production between 500 - 1000  aggregation : advance find method
   */

  res.send(products);
};

const storeProduct = async (req, res, next) => {
  /* joi valation :  */
  // console.log(req.files.image);
  // return;
  try {
    let imagePath = null;

    if (req.files.image) {
      let rootPath = path.resolve();
      let uniqueTimestap = "21423441234123";

      imagePath = path.join(
        "uploads",
        `${uniqueTimestap}-${req.files.image.name}`
      );
      req.files.image.mv(path.join(rootPath, imagePath));
    }


    let product = await Product.create({
      ...req.body,
      image: imagePath,
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
