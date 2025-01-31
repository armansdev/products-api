const express = require("express");
const connectDb = require("./config/db.config");
const prodRouter = require("./routers/products.routes");

const app = express();
connectDb();

app.use(express.json());
app.use("/api", prodRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
