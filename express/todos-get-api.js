const express = require('express')
const app = express()

app.get("/api/todos",(req,res) =>{
    console.log("send todos.");
    let todos = ["htm","css","js"]
    res.send(todos)
})

app.get("/todos",(req,res) =>{
    console.log("send todos.");
    let todos = ["htm","css","js"]
    res.send(todos)
})

app.get("/api/products",(req,res) =>{
    console.log("send todos.");
    let todos = ["htm","css","js"]
    res.send(todos)
})

/* code for POST todos */

app.listen(8000,() =>{
    console.log("server started.");
})
