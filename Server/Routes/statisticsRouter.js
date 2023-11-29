import express from "express";

import {
  verifyAuth,
  verifyManagerOrAdmin,
  verifyRefreshToken,
} from "../Middelwares/authMiddelware.js";

import { getStatistics } from "../Controllers/statisticsControllers.js";

const countRouter = express.Router();

countRouter.get(
  "/",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  getStatistics
);

export { countRouter };
