const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

/* default export */
module.exports = Product;
