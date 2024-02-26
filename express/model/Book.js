const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true, // Datbase validation
  },
  isbn: Number,
  author: {  // reference documenets
    type: ObjectId,
    ref: "Author",
    required: true,
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
