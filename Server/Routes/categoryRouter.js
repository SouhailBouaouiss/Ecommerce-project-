import express from "express";
import validate from "express-validator";
import {
  expressValidatorCheck,
  verifyAuth,
  verifyManagerOrAdmin,
} from "../Middelwares/authMiddelware.js";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getSearchedCategories,
  showSubcatOfCat,
  updateCategory,
} from "../Controllers/categoryControllers.js";

const categoryRouter = express.Router();

// Create new category

categoryRouter.post(
  "/",
  validate.body("category_name").notEmpty(),
  expressValidatorCheck,
  verifyAuth,
  verifyManagerOrAdmin,
  createNewCategory
);

// List all categories

categoryRouter.get("/", getAllCategories);

// List all categories  based on  query search

categoryRouter.get("/search", getSearchedCategories);

// Get a specific category using id
categoryRouter.get("/category_subcategory/:category_id", showSubcatOfCat);

categoryRouter.get("/:id", getCategoryById);

// Update a specific category

categoryRouter.put("/:id", verifyAuth, verifyManagerOrAdmin, updateCategory);

// Delete a category

categoryRouter.delete("/:id", verifyAuth, verifyManagerOrAdmin, deleteCategory);

export { categoryRouter };
