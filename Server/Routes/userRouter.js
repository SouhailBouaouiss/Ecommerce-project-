import { Router } from "express";

import {
  expressValidatorCheck,
  tokenGenration,
  verifyAuth,
  verifyAdmin,
  verifyManagerOrAdmin,
} from "../Middelwares/authMiddelware";

import {
  creatUser,
  deleteUser,
  getOneUserData,
  getUserSearch,
  getUsersData,
  signin,
  updateUserData,
} from "../Controllers/userControllers";

const usersRouter = Router();

// Athentication

usersRouter.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isStrongPassword.isString()
    .withMessage("Password must be at least 6 characters long"),
  expressValidatorCheck,
  // passport.authenticate("local", { failureRedirect: "" }), // Create
  tokenGenration,
  signin
);

// Creat a user document

usersRouter.post(
  "/",
  verifyAuth,
  verifyAdmin,
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isStrongPassword.isString()
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
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isStrongPassword.isString()
    .withMessage("Password must be at least 6 characters long"),
  expressValidatorCheck,
  updateUserData
);

// Delete a user document

usersRouter.delete("/:id", verifyAuth, verifyAdmin, deleteUser);
