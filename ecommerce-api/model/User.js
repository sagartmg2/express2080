const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    /* custom validation  -- check email here.. */
  },
  phone: Number,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

/* default export */
module.exports = User;
