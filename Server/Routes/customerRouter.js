import { Router } from "express";
import passport from "passport";
import {
  expressValidatorCheck,
  tokenGenration,
} from "../Middelwares/authMiddelware";
import { signin, creatCustomer } from "../Controllers/customersControllers";

const customersRouter = Router();

customerRouters.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email adress").normalizeEmail(),
  body("password")
    .isStrongPassword()
    .isString()
    .withMessage("Password must be at least 6 characters long"),
  expressValidatorCheck,
  tokenGenration,
  signin
);

customerRouter.post("/customers, ");
