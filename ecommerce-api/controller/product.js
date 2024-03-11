const path = require("path");
const fs = require("fs");
const Product = require("../model/Product");
const Joi = require("joi");

const fetchProducts = async (req, res) => {
  // req.query.search

  let sort = req.query.sort || "dateDesc";

  let sortBy = {
    createdAt: -1,
  };

  if (sort == "priceAsc") {
    sortBy = { price: 1 };
  } else if (sort == "priceDesc") {
    sortBy = { price: -1 };
  }


  let products = await Product.find({
    title: new RegExp(req.query.search, "i")
  }).sort(sortBy);


  /* 
    fid production between 500 - 1000  aggregation : advance find method
   */


  res.send(products);
};

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
});

const storeProduct = async (req, res, next) => {
  /* TODO: try to re-use this joi validation code. also being used in singup */
  try {
    await storeProductValidationSchema.validateAsync(
      { ...req.body, ...req.files },
      {
        allowUnknown: true,
        abortEarly: false,
      }
    );
  } catch (err) {
    return res.status(400).send({
      msg: "validation error",
      errors: err.details.map((el) => {
        return {
          field: el.context.key,
          msg: el.message,
        };
      }),
    });
  }
  try {
    let imagePath = null;

    if (req.files?.image) {
      let rootPath = path.resolve();
      let uniqueTimestap = Date.now() + Math.floor(Math.random() * 1000);

      imagePath = path
        .join("/", "uploads", `${uniqueTimestap}-${req.files.image.name}`)
        .replaceAll("\\", "/");
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
  let matched = await Product.findById(req.params._id);
  if (!matched) {
    let error = new Error();
    error.statusCode = 404;
    error.msg = "Not found";
    throw error;
  }
  res.send(`${req.params._id} product updated`);
};

const deleteProduct = async (req, res, next) => {
  try {
    let matched = await Product.findById(req.params._id);
    if (!matched) {
      let error = new Error();
      error.statusCode = 404;
      error.msg = "Not found";
      throw error;
    }

    // let product = await Product.findByIdAndDelete(req.params._id);
    let product = await Product.deleteOne({ _id: req.params._id });
    fs.unlinkSync(path.join(path.resolve(), product.image));
    res.send("product deleted");
  } catch (err) {
    next(err);
  }
};

/* named exports */
module.exports = {
  fetchProducts: fetchProducts,
  storeProduct,
  updateProduct,
  deleteProduct,
};
