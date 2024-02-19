const express = require("express");
const app = express();

const { checkAuthentication, checkValidRole } = require("./middleware/auth");
/* object destructuring */

let lastId = 2;

let todos = [
  {
    id: 1,
    title: "html",
    status: true,
  },
  {
    id: 2,
    title: "css",
    status: false,
  },
];

/* middleware
     - simply a function which has access to req and res 
        and can modify them 
     - next: points to the next upcomming valid middleware
*/

// app.use(checkAuthentication); // global middleware
// app.use(checkValidRole); // global middleware

app.use(express.json()); // sets up req.body // () =>{  return (req,res,next) =>{ req.body = postman body }  }

const createTodos = (req, res) => {
  let inputTitle = req.body.title?.trim();

  // let todos = ["html","css"]
  // inputTitle = "html"

  if (!inputTitle) {
    return res.status(400).send({
      errors: [
        {
          key: "title",
          msg: "this field is required.", // TODO: send already exits
        },
      ],
    });
  }

  // let matched = todos.find(el =>el === inputTitle) // html
  let matched = todos.some((el) => el === inputTitle); // true

  if (matched) {
    return res.status(400).send({
      errors: [
        {
          key: "title",
          msg: "already exists",
        },
      ],
    });
  }

  /* input validation */

  lastId++;
  
  todos.push({
    id: lastId,
    title: req.body.title,
  });
  return res.send("todos creatred");
};

app.get("/api/todos", (req, res) => {
  console.log("response: list of todos ss.");
  res.send(todos);
});

/* route level middleware */
app.post("/api/todos", checkAuthentication, checkValidRole, createTodos);

app.put("/api/todos/:id", (req, res) => {
  /* code to update particular todo item from todos */
  /* map */

  // todos // [ {id:1,html} , {id:2, css} ]
  let existingTodo = todos.find(el => el.id == req.params.id)

  if(!existingTodo){
    return res.status(404).send()
  }

  todos = todos.map((el) => {
    if (el.id == req.params.id) {
      let newData = {
        title: req.body.title,
        status: req.body.status,
      };
      return newData;
    } else {
      return el;
    }
  });

  res.send(`update ${req.params.id}`);
});
app.delete("/api/todos/:id", (req, res) => {
  /* code to delete particular todo item from todos */
  /* array.filter.. */
  res.send(`delete ${req.params.id} `);
});

app.delete(
  "/api/todos/reset",
  checkAuthentication,
  checkValidRole,
  (req, res) => {
    todos = [];
    return res.status(204).send();
  }
);

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
