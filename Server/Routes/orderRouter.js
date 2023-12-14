import express from "express";
import validate from "express-validator";
import {
  checkValidation,
  expressValidatorCheck,
  verifyAuth,
  verifyCustomer,
  verifyManagerOrAdmin,
  verifyRefreshToken,
} from "../Middelwares/authMiddelware.js";

import {
  addOrder,
  getAllOrders,
  getOrderById,
  getOrdersByMounth,
} from "../Controllers/orderControllers.js";

const orderRouter = express.Router();

// Add new order

orderRouter.post(
  "/",
  verifyAuth,
  verifyRefreshToken,
  verifyCustomer,
  checkValidation,
  addOrder
);

// List all orders

orderRouter.get(
  "/",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  getAllOrders
);

// Get orders sorted by the mount of their creation

orderRouter.get(
  "/ordersByMonth",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  getOrdersByMounth
);

// Get a specific order using id

orderRouter.get(
  "/:id",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  getOrderById
);

export { orderRouter };
