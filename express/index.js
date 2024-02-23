const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // global middleware, req.body

const Book = require("./model/Book")

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

app.get("/api/books", async (req, res,next) => {
  // db.books.find({})
  try {
    let books = await Bookk.find({});
    res.send(books);
  } catch (err) {
    return next(err)
    res.status(500).send({
      msg: "Server error",
      error: err.message,
    });
  }
});

app.post("/api/books", async (req, res,next) => {
  /* db.books.insertOne */
  try {
    let { title, isbn } = req.body;
    let book = await Book.create({ title: title, isbn });
    res.send(book);
  } catch (err) {
    return next(err)
    res.status(500).send({
      msg: "Server error",
    });
  }
});

app.put("/api/books/:_id", async (req, res,next) => {
  try {
    let { title, isbn } = req.body;
    let book = await Book.findByIdAndUpdate(
      req.params._id,
      { title, isbn },
      { new: true }
    );
    res.send(book);
  } catch (err) {
    return next(err)
    res.status(500).send({
      msg: "Server error",
    });
  }
});

/* 
    Book.findByIdAndUpdate("asdfasdf..",{})
    Book.findByIdAndDelete("id..asdfadf")
*/

app.use((req,res) =>{
  res.status(404).send({msg: "resource not found"})
})

/* handle server error */
app.use((err,req,res,next) =>{
  res.status(500).send({
    msg: " server error",
    name: err.name
  })
})

app.listen(8000, () => {
  console.log("server started.");
});
