import { Subcategory } from "../Models/Subcategogy";

// Create new subcategory

const createNewSubcategory = (req, res, next) => {
  Subcategory.create(req.body).then((data) => {
    if (!data) {
      res.status(400).send({ message: "subcategory name already exists" });
      return;
    }
    res.status(201).send({ message: "subcategory created successfully" });
    return;
  });
};

// List all subcategories

const getAllSubcategories = (req, res, next) => {
  const page = req.query || 1;
  Subcategory.find()
    .populate({
      path: "category_id",
      options: { limit: 10, skip: (page - 1) * 10 },
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No subcategories found", data: [] });
        return;
      }
      res.status(200).send({ data });
    });
};

// List all subcategories  based on  query search

const getSearchedSubcategories = (req, res, next) => {
  const page = req.query.page || 1;
  const { query } = req.query;
  Subcategory.find({ $text: { $search: query } })
    .populate({
      path: "category_id",
      options: { limit: 10, skip: (page - 1) * 10 },
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No subcategories found", data: [] });
        return;
      }
      res.status(200).send({ data });
    });
};

// Get a specific category using id

const getSubcategoryById = (req, res, next) => {
  const { id } = req.body;
  Subcategory.findOne({ id })
    .populate("category_id")
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "subcategory not found" });
        return;
      }
      res.status(200).send({ data });
      return;
    });
};

// Update a specific category

const updateSubcategory = (req, res, next) => {
  Subcategory.findOneAndUpdate({ id }, req.body, { new: true }).then((data) => {
    if (!data) {
      res.status(404).send({ message: "invalid subcategory id" });
      return;
    }
    res.status(200).send({ message: "subcategory updated successfully", data });
  });
};

// Delete a subcategory

const deleteSubcategory = (req, res, next) => {
  const { id } = req.body;
  Subcategory.findOne({ id }).then((data) => {
    if (!data) {
      res.status(404).send({ message: "invalid subcategory id" });
      return;
    } else {
      if (Array.isArray(data?.products) && data?.products.length !== 0) {
        res.status(400).send({
          message: "products attached, cannot delete this subcategory",
        });
        return;
      } else {
        Subcategory.deleteOne(data).then((data) => {
          if (!data) {
            res.status(500).send({ message: "Internal Server" });
            return;
          } else {
            res
              .status(200)
              .send({ message: "subcategory deleted successfully" });
          }
        });
        return;
      }
    }
  });
};

export {
  createNewSubcategory,
  getAllSubcategories,
  getSearchedSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
};
