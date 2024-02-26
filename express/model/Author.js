const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AuthorSchema = new Schema({
  name: {
    type:String,
    requried:true,
  },
  address:{  // embedded documents
    permanent:{
        street:String,
        ward:Number
    },
  },
  email: String,
  contact: String,
  website: String,
});

const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
