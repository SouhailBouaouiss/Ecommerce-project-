import mongoose from "mongoose";
import { Users } from "../Models/User.js";
const url =
  "mongodb+srv://souhail:zev-3aMFq8MclZqFMKVk@firstcluster.aihbxtp.mongodb.net/";

const connecting = async () => {
  await mongoose.connect(url, { dbName: "3WA_Ecom" });

  console.log("db connected!");
};

export { connecting };
