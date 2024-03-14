const path = require("path");
const fs = require("fs");
const Product = require("../model/Product");
const Joi = require("joi");

const fetchProducts = async (req, res) => {
  // req.query.search
  try {
    let sort = req.query.sort || "dateDesc";
    let priceFrom = parseFloat(req.query.priceFrom) || 0;
    let priceTo = parseFloat(req.query.priceTo) || 9999999999;
    let perPage = parseInt(req.query.perPage) || 5;
    let page = parseInt(req.query.page) || 1;

    let sortBy = {
      createdAt: -1,
    };

    if (sort == "priceAsc") {
      sortBy = { price: 1 };
    } else if (sort == "priceDesc") {
      sortBy = { price: -1 };
    } else if (sort == "titleAsc") {
      sortBy = { title: 1 };
    } else if (sort == "titleDesc") {
      sortBy = { title: -1 };
    }

    let productFilter = {
      title: new RegExp(req.query.search, "i"),
      $and: [{ price: { $gte: priceFrom } }, { price: { $lte: priceTo } }],
    };

    let products = await Product.find(productFilter)
      .sort(sortBy)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("createdBy");

    let totalProducts = await Product.countDocuments(productFilter);

    /* 
    fid production between 500 - 1000  aggregation : advance find method
   */

    products = await Product.aggregate([
      {
        $match: {
          title: new RegExp(req.query.search, "i"),
        },
      },
      {
        $match: {
          $and: [{ price: { $gte: priceFrom } }, { price: { $lte: priceTo } }],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: "$createdBy",
      },
      // {
      //   $project: {
      //     "createdBy.name": 1,
      //     "createdBy.email": 1,
      //   },
      // },
      // {
      //   $facet:{
      //   }
      // }
      {
        $skip: (page - 1) * perPage,
      },
      {
        $limit: perPage,
      },
    ]);

    res.send({
      page: page,
      perPage: perPage,
      total: totalProducts,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};



// axios.get("https:///")
// axios.get("localhost:8000")

const storeProduct = async (req, res, next) => {
  /* TODO: try to re-use this joi validation code. also being used in singup */
  
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
    fs.unlink(path.join(path.resolve(), product.image), (err, data) => {
      console.log(err);
    });
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
