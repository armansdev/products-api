const { Schema, model } = require("mongoose");

const product = new Schema({
  category: { type: String, required: true },
  products: [
    {
      name: { type: String },
      description: { type: String },
    },
  ],
});

module.exports = model("product", product);
