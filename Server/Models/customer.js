import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;

const customerschema = new Schema({
  id: {
    type: String,
    default: v4(),
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
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

// customerschema.index({ first_name: "text", last_name: "text" });
// customerschema.index({ first_name: 7, last_name: 7 });

const Customers = mongoose.model("customer", customerschema);

export { Customers };
