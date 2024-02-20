/* 
    show dbs // check for existing database  

    use books
        - create 
        - goes inot books database


    table / collections
    row / documents




*/

/* CRUD operations */

db.createCollection("books")
db.books.insertOne({ name: "python", isbn: 213123 })
db.books.insertMany([
    { name: "java", isbn: 2222 },
    { name: "javascript", isbn: 3333 },
])

db.books.insertOne({ name: "ruby", isbn: 4444, pubslishedDate:"2023-01-01" })


db.books.find()
db.books.find({name:"ruby"})
// db.books.find(filter)

/* $set is one of update operator  */
db.books.updateOne({name:"ruby"},{$set :{name:"ruby and rails"}} )


