const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/productsAndCategories");
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDb;
