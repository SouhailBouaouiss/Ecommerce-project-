import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;

const userschema = new Schema({
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
  role: {
    type: String,
    required: true,
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
  last_update: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Users = mongoose.model("user", userschema);

export { Users };
