import express from "express";
import validate from "express-validator";
import {
  checkValidation,
  expressValidatorCheck,
  verifyAuth,
  verifyCustomer,
  verifyManagerOrAdmin,
} from "../Middelwares/authMiddelware.js";

import {
  addOrder,
  getAllOrders,
  getOrderById,
} from "../Controllers/orderControllers.js";

const orderRouter = express.Router();

// Add new order

orderRouter.post("/", verifyAuth, verifyCustomer, checkValidation, addOrder);

// List all orders

orderRouter.get("/", verifyAuth, verifyManagerOrAdmin, getAllOrders);

// Get a specific order using id

orderRouter.get("/:id", verifyAuth, verifyManagerOrAdmin, getOrderById);

export { orderRouter };