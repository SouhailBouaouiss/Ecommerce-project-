import { Products } from "../Models/Product.js";

// Create new product

const createNewProduct = (req, res, next) => {
  Products.create(req.body).then((data) => {
    if (!data) {
      res.status(400).send({ message: "product name already exists" });
      return;
    }
    res.status(201).send({ message: "product created successfully" });
    return;
  });
};

// List all products

const getAllProducts = (req, res, next) => {
  const page = req.query || 1;
  Products.find()
    .populate({
      path: "subcategory_id",
      options: { limit: 10, skip: (page - 1) * 10 },
      populate: {
        path: "category_id",
        options: { limit: 10, skip: (page - 1) * 10 },
      },
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No products found" });
        return;
      }
      res.status(200).send({ data });
    });
};

// List all products  based on  query search

const getSearchedProducts = (req, res, next) => {
  const page = req.query.page || 1;
  const { query } = req.query;
  Products.find({ $text: { $search: query } })
    .populate({
      path: "subcategory_id",
      options: { limit: 10, skip: (page - 1) * 10 },
      populate: {
        path: "category_id",
        options: { limit: 10, skip: (page - 1) * 10 },
      },
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No products found" });
        return;
      }
      res.status(200).send({ data });
    });
};

// Get a specific product using id

const getProductById = (req, res, next) => {
  const { id } = req.body;
  Products.findOne({ id })
    .populate({ path: "subcategory_id", populate: { path: "category_id" } })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "product not found" });
        return;
      }
      res.status(200).send({ data });
      return;
    });
};

// Update a specific product

const updateProduct = (req, res, next) => {
  const { id } = req.body;
  Products.findOneAndUpdate({ id }, req.body).then((data) => {
    if (!data) {
      res.status(404).send({ message: "invalid product id" });
      return;
    }
    res.status(200).send({ message: "product updated successfully", data });
  });
};

// Delete a product
const deleteProduct = (req, res, next) => {
  const { id } = req.body;
  Products.deleteOne({ id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "invalid product id" });
      }
      res.status(200).send({ message: "product deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

export {
  deleteProduct,
  updateProduct,
  getProductById,
  getSearchedProducts,
  getAllProducts,
  createNewProduct,
  deleteProduct,
};
