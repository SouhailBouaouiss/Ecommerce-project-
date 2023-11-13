import express from "express";

import {
  verifyAuth,
  verifyManagerOrAdmin,
} from "../Middelwares/authMiddelware.js";

import {
  createNewProduct,
  getAllProducts,
  getSearchedProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Controllers/productsControllers.js";

const productRouter = express.Router();

// Create new product

productRouter.post("/", verifyAuth, verifyManagerOrAdmin, createNewProduct);

// List all products

productRouter.get("/", getAllProducts);

// List all products  based on  query search

productRouter.get("/search", getSearchedProducts);

// Get a specific product using id

productRouter.get("/:id", getProductById);

// Update a specific product

productRouter.put("/:id", verifyAuth, verifyManagerOrAdmin, updateProduct);

// Delete a product
subcategoryRouter.delete(
  "/:id",
  verifyAuth,
  verifyManagerOrAdmin,
  deleteProduct
);

export { productRouter };
