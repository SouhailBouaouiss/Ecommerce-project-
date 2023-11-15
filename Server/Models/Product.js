import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    default: uuidv4,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategory_id: {
    type: mongoose.Types.ObjectId,
    ref: "subcategory",
  },
  short_description: {
    type: String,
    required: true,
  },
  long_description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount_price: {
    type: Number,
  },
  quatity: {
    type: Number,
    default: 0,
    required: true,
  },
  options: {
    type: [String],
  },
  active: {
    type: Boolean,
    default: false,
  },
});

productSchema.index({ product_name: "text" });

const Products = mongoose.model("product", productSchema);

Product.createIndexes();

export { Products };
