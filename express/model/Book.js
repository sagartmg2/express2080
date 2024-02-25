const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: {
    type: String,
    required: true, // Datbase validation
  },
  isbn: Number,
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
