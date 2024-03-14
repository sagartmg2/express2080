const express = require("express");
const app = express()

app.use("/api/test",(req,res) =>{
    res.send("test success")
})

app.listen(8000,() =>{
    console.log("server started.");
})