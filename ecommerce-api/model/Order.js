const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const OrderSchema = new Schema({
  products: [
    {
      _id: ObjectId,
      price: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: Number,
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

/* default export */
module.exports = Order;
