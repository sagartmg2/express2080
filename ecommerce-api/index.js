const express = require("express");
const app = express();

const productRoutes = require("./route/product");

require("./config/database");

app.use(express.json()); // global middleware,  sets up req.body
app.use(productRoutes);

app.listen(8000, () => {
  console.log("server started.");
});
