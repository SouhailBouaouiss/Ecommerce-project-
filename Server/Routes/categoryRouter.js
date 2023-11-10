import express from "express";
import {
  verifyAuth,
  verifyManagerOrAdmin,
} from "../Middelwares/authMiddelware.js";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getSearchedCategories,
  updateCategory,
} from "../Controllers/categoryControllers.js";

const categoryRouter = express.Router();

// Create new category

categoryRouter.post("/", verifyAuth, verifyManagerOrAdmin, createNewCategory);

// List all categories

categoryRouter.get("/", getAllCategories);

// List all categories  based on  query search

categoryRouter.get("/", getSearchedCategories);

// Get a specific category using id

categoryRouter.get("/:id", getCategoryById);

// Update a specific category

categoryRouter.put("/:id", verifyAuth, verifyManagerOrAdmin, updateCategory);

// Delete a category

categoryRouter.delete("/:id", verifyAuth, verifyManagerOrAdmin, deleteCategory);

export { categoryRouter };
