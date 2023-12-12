import mongoose from "mongoose";
import { Users } from "../Models/User.js";
const url =
  "mongodb+srv://otmaneabbadia89:zev-XMUD2X35FTV@firstcluster.aihbxtp.mongodb.net/";

const connecting = async () => {
  return mongoose.connect(url, { dbName: "3WA_Ecom" });
};

export { connecting };
