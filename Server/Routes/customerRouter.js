import express from "express";
import passport from "passport";

import validate from "express-validator";

import {
  expressValidatorCheck,
  tokenGenration,
  verifyAuth,
  verifyAdmin,
  verifyManagerOrAdmin,
  verifyCustomer,
  verifyRefreshToken,
} from "../Middelwares/authMiddelware.js";

import {
  signin,
  createNewCustomer,
  getCustomersData,
  getCustomerSearch,
  getOneCustomerData,
  updateCustomerData,
  deleteCustomer,
  getCustomerData,
  updateCustomerDataByCustomer,
} from "../Controllers/customersControllers.js";

import { validateEmail } from "../Middelwares/validateEmail.js";
import sendEmail from "../Middelwares/email.js";

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
// Express Validator: body() x 4
// Middleware: expressValidatorCheck
customerRouter.post(
  "/signup",
  validate
    .body("first_name")
    .isAlpha()
    .withMessage("First name should contain only alphabetic characters"),
  validate
    .body("last_name")
    .isAlpha()
    .withMessage("Last name should contain only alphabetic characters"),
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
  verifyCustomer,
  createNewCustomer,
  sendEmail
);

customerRouter.get("/validate", validateEmail);

//Get customers data
customerRouter.get(
  "/",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  getCustomersData
);

// Get a customer based on search query value
customerRouter.get(
  "/search",
  verifyAuth,
  verifyManagerOrAdmin,
  getCustomerSearch
);

// get the customer's profile
customerRouter.get(
  "/profile",
  verifyAuth,
  verifyRefreshToken,
  verifyCustomer,
  getCustomerData
); // controller

// Get a specific customer data
customerRouter.get(
  "/:id",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  getOneCustomerData
);

// Update a customer document
customerRouter.put(
  "/:id",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  updateCustomerData
);

// Delete a customer document
customerRouter.delete(
  "/:id",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  deleteCustomer
);

// update the cutomers data
customerRouter.patch(
  "/profile/update",
  verifyAuth,
  verifyRefreshToken,
  verifyCustomer,
  updateCustomerDataByCustomer
);

export { customerRouter };
