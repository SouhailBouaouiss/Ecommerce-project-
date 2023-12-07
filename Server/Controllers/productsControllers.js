import mongoose from "mongoose";
import { Products } from "../Models/Product.js";
import { Subcategory } from "../Models/Subcategogy.js";

// Create new product

const createNewProduct = async (req, res, next) => {
  // Initialize a session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newProduct = await Products.create([req.product], { session });
    console.log("newproduct", newProduct);

    // Retrieve the product _id

    const newProductID = newProduct[0]._id.toString();
    console.log(newProductID);

    // Retrieve the product's subcategory_id

    const newProductSubcategoryID = newProduct[0].subcategory_id.toString();
    console.log(newProductSubcategoryID);

    // Find the subcategory of the new product

    const productSubcategory = await Subcategory.findById(
      newProductSubcategoryID
    );

    console.log(productSubcategory);
    // Push the product _id into the products array in subcategory

    productSubcategory.products.addToSet(newProductID);
    productSubcategory.save();

    session.commitTransaction();
    return res
      .status(200)
      .send({ message: "Product created successfully", data: newProduct[0] });
  } catch (error) {
    // Reject the two operations in case of the failure of one of them
    await session.abortTransaction();

    // End the session
    session.endSession();
    res.status(500).send({ message: "Something went wrong", ...error });
  }
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
  Products.find({
    $or: [{ product_name: { $regex: new RegExp(query, "i") } }],
  })
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
  const { id } = req.params;
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
  const { id } = req.params;
  Products.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(
    (data) => {
      if (!data) {
        res.status(404).send({ message: "invalid product id " });
        return;
      }
      console.log("New data", data);
      res.status(200).send({ message: "product updated successfully", data });
    }
  );
};

// Delete a product
const deleteProduct = (req, res, next) => {
  const { id } = req.params;
  Products.deleteOne({ _id: id })
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
  updateProduct,
  getProductById,
  getSearchedProducts,
  getAllProducts,
  createNewProduct,
  deleteProduct,
};
