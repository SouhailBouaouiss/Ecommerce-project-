import { Router } from "express";
import passport from "passport";
import {
  expressValidatorCheck,
  essValidatorCheck,
  tokenGenration,
  verifyAuth,
  verifyAdmin,
  verifyManagerOrAdmin,
} from "../Middelwares/authMiddelware";

import {
  creatUser,
  getUsersData,
  signin,
} from "../Controllers/userControllers";

const usersRouter = Router();

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

usersRouter.get("/", verifyAuth, verifyManagerOrAdmin, getUsersData);
