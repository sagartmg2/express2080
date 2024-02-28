const express = require("express");
const app = express();

const productRoutes = require("./route/product");
const authRoutes = require("./route/auth");
const handleServerError = require("./middleware/handleServerError");

require("./config/database");

app.use(express.json()); // global middleware,  sets up req.body

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use(handleServerError);

app.listen(8000, () => {
  console.log("server started.");
});