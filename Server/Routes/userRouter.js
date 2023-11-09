import { Router } from "express";
import passport from "passport";
import { credentialsValidation, signin } from "../Middelwares/authMiddelware";

const usersRouter = Router();

usersRouter.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isStrongPassword.isString()
    .withMessage("Password must be at least 6 characters long"),
  credentialsValidation,
  passport.authenticate("local"),
  signin
);
