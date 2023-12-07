import express from "express";

import {
  verifyAuth,
  verifyManagerOrAdmin,
  verifyRefreshToken,
} from "../Middelwares/authMiddelware.js";
import { upload } from "../upload/storing.js";

import { postProduct } from "../Middelwares/postProduct.js";

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

productRouter.post(
  "/",
  (req, res, next) => {
    console.log("Creating product", req.body);
    next();
  },
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  upload.single("file"),
  postProduct,
  createNewProduct
);

// List all products

productRouter.get("/", getAllProducts);

// List all products  based on  query search

productRouter.get("/search", getSearchedProducts);

// Get a specific product using id

productRouter.get("/:id", getProductById);

// Update a specific product

productRouter.put(
  "/:id",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  updateProduct
);

// Delete a product
productRouter.delete(
  "/:id",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  deleteProduct
);

export { productRouter };
