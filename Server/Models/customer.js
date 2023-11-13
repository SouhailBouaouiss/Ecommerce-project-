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
  user_name: {
    type: String,
    required: true,
    unique: true,
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
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Customers = mongoose.model("customer", customerschema, "customers");

export { Customers };
