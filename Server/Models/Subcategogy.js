import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  id: {
    type: String,
    default: uuidv4,
  },
  subcategory_name: {
    type: String,
    unique: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
  ],
});

subcategorySchema.index({ subcategory_name: "text" });

const Subcategory = mongoose.model("subcategory", subcategorySchema);

Subcategory.createIndexes();

export { Subcategory };
