import express from "express";
import validate from "express-validator";
import {
  expressValidatorCheck,
  verifyAuth,
  verifyManagerOrAdmin,
} from "../Middelwares/authMiddelware.js";
import {
  checkEmailValidation,
  verifyCustomer,
} from "../Middelwares/customerMiddelware.js";
import { addOrder } from "../Controllers/orderControllers.js";

const orderRouter = express.Router();

// Add new order

orderRouter.post(
  "/",
  verifyAuth,
  verifyCustomer,
  checkEmailValidation,
  addOrder
);

// List all orders

orderRouter.get("/", verifyAuth, verifyManagerOrAdmin, getAllOrders);
