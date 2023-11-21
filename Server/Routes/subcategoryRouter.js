import express from "express";
import validate from "express-validator";
import {
  expressValidatorCheck,
  verifyAuth,
  verifyManagerOrAdmin,
} from "../Middelwares/authMiddelware.js";
import {
  createNewSubcategory,
  deleteSubcategory,
  getAllSubcategories,
  getSearchedSubcategories,
  getSubcategoryById,
  updateSubcategory,
} from "../Controllers/subcategoryControllers.js";

const subcategoryRouter = express.Router();

// Create new subcategory

subcategoryRouter.post(
  "/",
  validate.body("subcategory_name").notEmpty(),
  expressValidatorCheck,
  // verifyAuth,
  // verifyManagerOrAdmin,
  createNewSubcategory
);

// List all subcategories

subcategoryRouter.get("/", getAllSubcategories);

// List all subcategories  based on  query search

subcategoryRouter.get("/search", getSearchedSubcategories);

// Get a specific category using id

subcategoryRouter.get("/:id", getSubcategoryById);

// Update a specific subcategory

subcategoryRouter.put(
  "/:id",
  verifyAuth,
  verifyManagerOrAdmin,
  updateSubcategory
);

// Delete a category

subcategoryRouter.delete(
  "/:id",
  verifyAuth,
  verifyManagerOrAdmin,
  deleteSubcategory
);

export { subcategoryRouter };
