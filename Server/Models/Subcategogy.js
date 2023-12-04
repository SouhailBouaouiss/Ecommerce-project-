import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  id: {
    type: String,
    default: uuidv4(),
  },
  subcategory_name: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    required: true,
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
  ],
});

subcategorySchema.index({ subcategory_name: "text" });
subcategorySchema.index({ subcategory_name: 3 });

const Subcategory = mongoose.model("subcategory", subcategorySchema);

Subcategory.createIndexes();

export { Subcategory };
