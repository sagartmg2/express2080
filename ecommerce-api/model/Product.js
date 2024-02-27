const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: String,
  price: Number,
});

const Product = mongoose.model("Product", ProductSchema);

/* default export */
module.exports = Product