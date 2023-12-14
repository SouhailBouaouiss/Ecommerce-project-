import mongoose from "mongoose";
import { stringify, v4 as uuidv4 } from "uuid";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer_id: {
    type: mongoose.Types.ObjectId,
    ref: "customer",
  },
  order_items: [{ type: mongoose.Types.ObjectId, ref: "product" }],
  items_total: {
    type: Number,
    default: 0,
  },
  order_date: {
    type: Date,
    default: new Date().toDateString(),
  },
  status: {
    type: String,
    default: "open",
  },
  id: {
    type: String,
    default: uuidv4(),
  },
});

orderSchema.pre("save", function (next) {
  this.items_total = this.order_items.length;
  next();
});

const Order = mongoose.model("order", orderSchema);

export { Order };
