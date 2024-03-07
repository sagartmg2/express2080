const mongoose = require("mongoose");
const { BUYER, SELLER } = require("../constant/role");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    // unique:true,
    type: String,
    required: true,
    /* custom mongoose validation  -- check email here.. */
    validate: {
      validator: async (value) => {
        let matched = await mongoose.models.User.findOne({ email: value });
        if (matched) {
          return false;
        }
      },
      message: "email already used",
    },
  },
  phone: Number,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [ BUYER, SELLER],
    required: true,
    set:(value) =>{
      console.log(value);
      return value.toLowerCase()
    }
  },
  
});

const User = mongoose.model("User", UserSchema);

/* default export */
module.exports = User;
