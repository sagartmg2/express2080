const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
// throw new Error("custom error")
const productRoutes = require("./route/product");
const authRoutes = require("./route/auth");
const orderRoutes = require("./route/order")
const handleServerError = require("./middleware/handleServerError");

require("./config/database");

app.use(express.json()); // global middleware,  sets up req.body
app.use(fileUpload()); // handles form-data

/* serve static files */
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.use(handleServerError);
// fs.writeFileSync(path.join(path.resolve(),"custom.txt"),"our text" );
// fs.unlinkSync(path.join(path.resolve(),"custom.txt"))

app.listen(8000, () => {
  console.log("server started.");
});
