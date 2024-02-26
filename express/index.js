const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // global middleware, req.body

const Book = require("./model/Book");
const Author = require("./model/Author");

mongoose
  .connect("mongodb://127.0.0.1:27017/bookStore")
  .then(() => console.log("Connected!"));

/* 
app.get("/api/books", (req, res) => {
  // db.books.find()
  Book.find({}).then((data) => {
    console.log(data);
    res.send(data);
  });
}); 

*/

app.get("/api/books", async (req, res, next) => {
  // db.books.find({})
  try {
    let books = await Book.find({});
    res.send(books);
  } catch (err) {
    return next(err);
  }
});

/* client slide validation */
app.post("/api/books", async (req, res, next) => {
  try {
    let { title, isbn } = req.body;

    /* server side validation */
    // if(!title){
    //   return res.status(400).send("title is required.")
    // }

    let book = await Book.create(req.body);
    res.send(book);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/authors", async (req, res, next) => {
  try {
    let author = await Author.create({
      name:"hari"
    });
    res.send(author);
  } catch (err) {
    return next(err);
  }
});

app.put("/api/books/:_id", async (req, res, next) => {
  try {
    let matched = await Bookk.findById(req.params._id);
    if (!matched) {
      return res.status(404).send();
    }

    let { title, isbn } = req.body;
    let book = await Book.findByIdAndUpdate(
      req.params._id,
      { title, isbn },
      { new: true, runValidators: true }
    );
    res.send(book);

  } catch (err) {
    return next(err);
  }
});

app.delete("/api/books/:_id", async (req, res, next) => {
  try {
    let book = await Book.findByIdAndDelete(req.params._id);
    res.status(204).send("");
  } catch (err) {
    return next(err);
  }
});

/* 
    Book.findByIdAndDelete("id..asdfadf")
*/

app.use((req, res) => {
  res.status(404).send({ msg: "resource not found" });
});

/* handle server error */
app.use((err, req, res, next) => {
  let statusCode = 500;
  let msg = "Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    msg = "Bad Request / Please check your form ";
  }

  /* 

    error = {
      title: "already used",
      isbn: "only numbers"
    }

    errors: [
      {field:"title",msg: "required field" },
      {field:"isbn", msg: "numbers only" },
    ]


      */
  res.status(statusCode).send({
    msg: msg,
    name: err.name,
    error: err,
  });
});

app.listen(8000, () => {
  console.log("server started.");
});
