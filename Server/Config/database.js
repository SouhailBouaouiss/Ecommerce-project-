import mongoose from "mongoose";
import { Users } from "../Models/User.js";
const url = "mongodb://127.0.0.1:27017";

const connecting = async () => {
  await mongoose.connect(url, { dbName: "check" });

  console.log("db connected!");
};

export { connecting };
