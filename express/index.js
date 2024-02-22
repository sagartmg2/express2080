const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // global middleware, req.body

mongoose
  .connect("mongodb://127.0.0.1:27017/bookStore")
  .then(() => console.log("Connected!"));

const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: String,
  isbn: Number,
});

const Book = mongoose.model("Book", BookSchema);

app.get("/api/books", (req, res) => {
  // db.books.find()
  Book.find({}).then((data) => {
    console.log(data);
    res.send(data);
  });
});

app.post("/api/books", (req, res) => {
  /* db.books.insertOne */
  let { title, isbn } = req.body;
  
  Book.create({ title: title, isbn })
    .then((book) => {
      res.send(book);
    })
    .catch((err) => {
      res.send(err);
    });
});

/* 
    Book.findByIdAndUpdate("asdfasdf..",{})
    Book.findByIdAndDelete("id..asdfadf")
*/

app.listen(8000, () => {
  console.log("server started.");
});
