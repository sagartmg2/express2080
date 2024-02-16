const express = require("express");
const app = express();

const {checkAuthentication,checkValidRole} =  require('./middleware/auth')
/* object destructuring */

let todos = ["html", "css"];


/* middleware
     - simply a function which has access to req and res 
        and can modify them 
     - next: points to the next upcomming valid middleware
*/


// app.use(checkAuthentication); // global middleware
// app.use(checkValidRole); // global middleware
app.use( express.json() ) // sets up req.body // () =>{  return (req,res,next) =>{ req.body = postman body }  }

const createTodos = (req, res) => {
    console.log(req.body)

    /* input validation */

    todos.push(req.body.title);
    return res.send("todos creatred");
}


app.get("/api/todos", (req, res) => {
  console.log("response: list of todos ss.");
  res.send(todos);
});



/* route level middleware */
app.post("/api/todos", checkAuthentication,checkValidRole, createTodos );

app.delete("/api/todos/reset",checkAuthentication,checkValidRole, (req, res) => {
  todos = [];
  return res.status(204).send();
});

app.listen(8000, () => {
  console.log("server started..");
});

/* status codes
    2 200,201, 203, 204 - succes
    3: redirect
    4: client error
        400  - bad request
        401  - unauthorized // not logged in .  

        404 - resoruce not found

*/
