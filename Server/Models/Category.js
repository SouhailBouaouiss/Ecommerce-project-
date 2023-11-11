import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  id: {
    type: String,
    default: uuidv4,
  },
  category_name: {
    type: String,
    unique: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  subCategories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "subcategory",
    },
  ],
});

categorySchema.index({ category_name: "text" });

const Category = mongoose.model("category", categorySchema);

Category.createIndexes();

export { Category };
