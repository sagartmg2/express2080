const express = require("express")
const app = express()

let todos = ["html","css"]
let loggedIn = false

/* middleware
     - simply a function which has access to req and res 
     - next: points to the next upcomming valid middleware
*/

function checkAuthentication(req, res , next){
    if(!loggedIn){
        return res.status(401).send()
    }
    console.log("checkAuthentication")
    next()
}

app.use(checkAuthentication)  // global middle-ware

app.get("/api/todos",(req,res) =>{
    console.log("response: list of todos ss.");
    res.send(todos)
})

app.post("/api/todos",(req,res) =>{
    todos.push("git")
    return res.send("todos creatred")
})

app.delete("/api/todos/reset",(req,res) =>{
    todos = []
    return res.status(204).send()
})

app.listen(8000, () =>{
    console.log("server started..");
})

/* status codes
    2 200,201, 203, 204 - succes
    3: redirect
    4: client error
        400  - bad request
        401  - unauthorized // not logged in .  

        404 - resoruce not found

*/


