/* 
    show dbs // check for existing database  

    use books
        - create 
        - goes inot books database


    table / collections
    row / documents




*/

/* CRUD operations */

db.createCollection("books");
db.books.insertOne({ name: "python", isbn: 213123 });
db.books.insertMany([
  { name: "java", isbn: 2222 },
  { name: "javascript", isbn: 3333 },
]);

db.books.insertOne({ name: "ruby", isbn: 4444, pubslishedDate: "2023-01-01" });

db.books.find();
db.books.find({ name: "ruby" });
// db.books.find(filter)

/* $set is one of update operator  */
db.books.updateOne({ name: "ruby" }, { $set: { name: "ruby and rails" } });

/* 


db.books.insertMany([
    {
        name:"ruby",isbn:333,
    },
    {
        name:"python",isbn:444,
    }
])
*/

db.books.find();
db.books.find({ _id: "65d5c4ea1364af9cae72c8e6" });
db.books.find({ _id: ObjectId("65d5c4ea1364af9cae72c8e6") });

db.books.findOne();
db.books.find({ isbn: 333 });
db.books.find({ isbn: 333 }, { name: 1, isbn: 1 });
db.books.find({ isbn: 333 }, { _id: 0, name: 1 });
db.books.find({}, { _id: 0, name: 1 });

/* update operators $set   $unset $inc  */

db.books.updateOne({ isbn: 333 }, { $set: { name: "ruby and rails" } });
db.books.updateMany({}, { $set: { publishedDate: "2023" } });
db.books.updateMany({ isbn: 333 }, { $unset: { publishedDate: 1 } });

db.books.insertOne({
  name: "java",
  publisher: {
    name: "name",
    estd: 2020,
  },
  authors: [
    {
      name: "Ram",
    },
    {
      name: "shyam",
    },
  ],
});
db.books.deleteOne({ isbn: 333 });
db.books.deleteMany({ isbn: 333 });

db.books.insertMany([
  {
    name: "one",
  },
  {
    title: "two",
  },
  {
    title: "three",
  },
]);

/* query operators */
db.books.find({ name: { $eq: "one" } });

db.books.find({ $or: [{ name: "one" }, { name: "two" }] });

db.books.updateMany(
  { title: { $exists: true } },
  { $rename: { title: "name" } }
);

db.todos.insertMany([
    {name:"html"},
    {title:"html"},
]);
