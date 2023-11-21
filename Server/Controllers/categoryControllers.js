import { Category } from "../Models/Category.js";
import { categoryRouter } from "../Routes/categoryRouter.js";

// Create a new category

const createNewCategory = (req, res, next) => {
  Category.create(req.body).then((data) => {
    if (!data) {
      res
        .status(400)
        .send({ message: ` the category ${category_name} already exist` });
      return;
    }
    res.status(201).send({ message: "category created successfully" });
    return;
  });
};

// Get all the categories

const getAllCategories = (req, res, next) => {
  const page = req.query.page || 1;
  Category.find()
    .skip((page - 1) * 10)
    .limit(10)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No categories found", data: [] });
        return;
      }
      res.status(200).send({ data });
    });
};

// List all categories  based on  query search

const getSearchedCategories = (req, res, next) => {
  const page = req.query.page || 1;
  const { query } = req.query;
  Category.find({
    $or: [{ category_name: { $regex: new RegExp(query, "i") } }],
  })
    .skip((page - 1) * 10)
    .limit(10)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No categories found", data: [] });
        return;
      }
      res.status(200).send({ data });
    });
};

// Get a specific category using id

const getCategoryById = (req, res, next) => {
  const { id } = req.params;
  Category.findOne({ id }).then((data) => {
    if (!data) {
      res.status(404).send({ message: "category not found" });
      return;
    }
    res.status(200).send({ data });
    return;
  });
};

// Update a specific category

const updateCategory = (req, res, next) => {
  const { id } = req.params;
  Category.findOneAndUpdate({ id }, req.body, { new: true }).then((data) => {
    if (!data) {
      res.status(404).send({ message: "invalid category id" });
      return;
    }
    res.status(200).send({ message: "category updated successfully", data });
  });
};

// Delete a category

const deleteCategory = (req, res, next) => {
  const { id } = req.params;
  Category.findOne({ id }).then((data) => {
    console.log(data);
    if (!data) {
      res.status(404).send({ message: "invalid category id" });
      return;
    } else {
      if (
        Array.isArray(data?.subCategories) &&
        data?.subCategories.length !== 0
      ) {
        res.status(400).send({
          message: "subcategories attached, cannot delete this category",
        });
        return;
      } else {
        Category.deleteOne(data).then((data) => {
          if (!data) {
            res.status(500).send({ message: "Internal Server" });
            return;
          } else {
            res.status(200).send({ message: "category deleted successfully" });
          }
        });
        return;
      }
    }
  });
};

export {
  createNewCategory,
  getAllCategories,
  getSearchedCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
