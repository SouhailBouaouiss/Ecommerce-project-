import express from "express";
import passport from "passport";

import {
  expressValidatorCheck,
  tokenGenration,
  verifyAuth,
  verifyAdmin,
  verifyManagerOrAdmin,
  verifyRefreshToken,
} from "../Middelwares/authMiddelware.js";

import {
  creatUser,
  deleteUser,
  getOneUserData,
  getUserSearch,
  getUsersData,
  signin,
  updateUserData,
} from "../Controllers/userControllers.js";

import validate from "express-validator";
import { sendCredentialsByEmail } from "../Middelwares/userEmail.js";

const usersRouter = express.Router();

// Athentication

usersRouter.post(
  "/login",
  validate
    .body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  validate
    .body("pwd")
    .notEmpty()
    .isString()
    .withMessage("Password must be at least 6 characters long"),
  expressValidatorCheck,
  tokenGenration,
  signin
);

// Creat a user document

usersRouter.post(
  "/",
  verifyAuth,
  verifyRefreshToken,
  verifyAdmin,
  validate
    .body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  validate
    .body("pwd")
    .isStrongPassword()
    .isString()
    .withMessage("Password must be at least 6 characters long"),
  expressValidatorCheck,
  creatUser,
  sendCredentialsByEmail
);

//Get users data

usersRouter.get(
  "/",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  getUsersData
);
// Get a users based on search query value

usersRouter.get(
  "/search",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  getUserSearch
);

// Get a specific user data

usersRouter.get(
  "/:id",
  verifyAuth,
  verifyRefreshToken,
  verifyManagerOrAdmin,
  getOneUserData
);

// Update a user document

usersRouter.put(
  "/:id",
  verifyAuth,
  verifyRefreshToken,
  verifyAdmin,
  validate
    .body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  // validate
  //   .body("password")
  //   .isStrongPassword()
  //   .isString()
  //   .withMessage("Password must be at least 6 characters long"),

  updateUserData
);

// Delete a user document

usersRouter.delete(
  "/:id",
  verifyAuth,
  verifyRefreshToken,
  verifyAdmin,
  deleteUser
);

export { usersRouter };
