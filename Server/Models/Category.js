import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  id: {
    type: String,
    default: v4(),
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
      type: Types.ObjectId,
      ref: "Subcategory",
    },
  ],
});

categorySchema.index({ category_name: "text" });

const Category = mongoose.model("category", categorySchema);

Category.createIndexes();

export { Category };
