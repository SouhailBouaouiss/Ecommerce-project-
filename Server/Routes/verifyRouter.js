import express from "express";

import {
  verifyAuth,
  verifyRefreshToken,
} from "../Middelwares/authMiddelware.js";
import { sendUpdatedData } from "../Controllers/verificationController.js";

const verifyRouter = express.Router();

verifyRouter.post("/", verifyAuth, verifyRefreshToken, sendUpdatedData);

export { verifyRouter };
