import express from "express";
import passport from "passport";

import {
  expressValidatorCheck,
  tokenGenration,
  verifyAuth,
  verifyAdmin,
  verifyManagerOrAdmin,
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
    .isStrongPassword()
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
  verifyAdmin,
  validate
    .body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  validate
    .body("password")
    .isStrongPassword()
    .isString()
    .withMessage("Password must be at least 6 characters long"),
  expressValidatorCheck,
  creatUser
);

//Get users data

usersRouter.get("/", verifyAuth, verifyManagerOrAdmin, getUsersData);

// Get a specific user data

usersRouter.get("/:id", verifyAuth, verifyManagerOrAdmin, getOneUserData);

// Get a users based on search query value

usersRouter.get("/", verifyAuth, verifyManagerOrAdmin, getUserSearch);

// Update a user document

usersRouter.put(
  "/:id",
  verifyAuth,
  verifyAdmin,
  validate
    .body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  validate
    .body("password")
    .isStrongPassword()
    .isString()
    .withMessage("Password must be at least 6 characters long"),
  expressValidatorCheck,
  updateUserData
);

// Delete a user document

usersRouter.delete("/:id", verifyAuth, verifyAdmin, deleteUser);

export { usersRouter };
