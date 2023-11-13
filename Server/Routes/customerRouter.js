import express from "express";
import passport from "passport";
import validate from "express-validator";

import validate from "express-validator";

import {
  expressValidatorCheck,
  tokenGenration,
  verifyAuth,
  verifyAdmin,
  verifyManagerOrAdmin,
} from "../Middelwares/authMiddelware.js";

import {
  signin,
  creatCustomer,
  getCustomersData,
  getCustomerSearch,
  getOneCustomerData,
  updateCustomerData,
  deleteCustomer,
} from "../Controllers/customersControllers.js";

const customerRouter = express.Router();

// Athentication
customerRouter.post(
  "/login",
  validate
    .body("email")
    .isEmail()
    .withMessage("Invalid email adress")
    .normalizeEmail(),
  validate
    .body("pwd")
    .isStrongPassword()
    .withMessage("Password must be at least 6 characters long"),
  expressValidatorCheck,
  tokenGenration,
  signin
);

// Creat a customer document
customerRouter.post("/");

//Get customers data
customerRouter.get("/", verifyAuth, verifyManagerOrAdmin, getCustomersData);

// Get a customer based on search query value
customerRouter.get(
  "/search",
  verifyAuth,
  verifyManagerOrAdmin,
  getCustomerSearch
);

// Get a specific customer data
customerRouter.get(
  "/:id",
  verifyAuth,
  verifyManagerOrAdmin,
  getOneCustomerData
);

// Update a user document
customerRouter.put(
  "/:id",
  verifyAuth,
  verifyManagerOrAdmin,
  validate
    .body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  validate
    .body("pwd")
    .isStrongPassword()
    .withMessage("Password must be at least 6 characters long"),
  expressValidatorCheck,
  updateCustomerData
);

// Delete a customer document

customerRouter.delete("/:id", verifyAuth, verifyManagerOrAdmin, deleteCustomer);

export { customerRouter };
