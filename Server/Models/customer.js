import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;

const customerschema = new Schema({
  id: {
    type: String,
    default: v4(),
  },
  customer_first_name: {
    type: String,
    required: true,
  },
  customer_last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  valid_account: {
    type: Boolean,
    default: false,
  },
  pwd: {
    type: String,
    required: true,
  },
  creation_date: {
    type: String,
    default: new Date().toDateString(),
  },
  last_login: {
    type: String,
    default: new Date().toDateString(),
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// customerschema.index({
//   customer_first_name: "text",
//   customer_last_name: "text",
// });
// customerschema.index({ customer_first_name: 5, customer_last_name: 5 });
const Customers =
  mongoose.models.customer || mongoose.model("customer", customerschema);

// Customers.createIndexes();

export { Customers };
