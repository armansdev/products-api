const product = require("../models/product.model");
const express = require("express");

const router = express.Router();

// POST products
router.post("/", async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ message: "Invalid data format!" });
    }

    for (const { category, products } of data) {
      if (!category || !products || !Array.isArray(products)) {
        return res
          .status(400)
          .json({ message: "Invalid category or product format!" });
      }

      const existingCategory = await product.findOne({ category });

      if (existingCategory) {
        const uniqueProducts = [
          ...existingCategory.products,
          ...products.filter(
            (newProduct) =>
              !existingCategory.products.some(
                (existingProduct) => existingProduct.name === newProduct.name
              )
          ),
        ];

        await product.updateOne(
          { category },
          { $set: { products: uniqueProducts } }
        );
      } else {
        await product.create({ category, products });
      }
    }

    res.status(201).json({ message: "Products inserted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET products
router.get("/", async (req, res) => {
  try {
    const products = await product.find().select({ category: 1 });
    res.status(201).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
