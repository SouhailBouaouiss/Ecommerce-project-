import mongoose, { mongo } from "mongoose";
import { Category } from "../Models/Category.js";
import { Subcategory } from "../Models/Subcategogy.js";

// Create new subcategory

const createNewSubcategory = async (req, res, next) => {
  // initialize a session
  const session = await mongoose.startSession();
  //start transaction
  session.startTransaction();
  try {
    // Create a subcategory

    const newSub = await Subcategory.create([req.body], { session });

    // Retrieve the _id of the new subcategory

    const newSubId = newSub[0]._id.toString();

    // Retrieve the category_id from the new subcategory

    const newSubcategoryCategoryId = newSub[0].category_id.toString();

    // find the category of the new subcategory

    const categ = await Category.findById(newSubcategoryCategoryId);

    // Push the _id of the sub to the array of subcategories in the category model

    categ.subCategories.addToSet(newSubId);
    categ.save();

    // Commit the transaction

    await session.commitTransaction();

    return res
      .status(200)
      .send({ message: "Subcategory created successfully" });
  } catch (error) {
    // Reject the two operations in case of the failure of one of them
    await session.abortTransaction();

    // End the session
    session.endSession();
    res.status(500).send({ message: "Something went wrong", ...error });
  }
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
  Subcategory.find({
    $or: [{ subcategory_name: { $regex: new RegExp(query, "i") } }],
  })
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
  const { id } = req.params;
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
  const { id } = req.params;
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
  const { id } = req.params;
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
