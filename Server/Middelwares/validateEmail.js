import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import {Customers} from "../Models/customer.js";

dotenv.config();

const validateEmail = (req, res) => {
  const tokenEmail = req.query.token;
  console.log("token email", tokenEmail);
  try {
    const decoded = jwt.verify(tokenEmail, process.env.JWT_EMAIL);

    console.log("Decoded token: ", decoded);

    if (!decoded._id) {
      return next({
        message: "Couldn't capture the id from the token",
        status: 422,
      });
    } else {
      Customers.updateOne({ _id: decoded._id }, { valid_account: true })
        .then((res) => {
          res.status(200).send({ message: "Account got activated" });
        })
        .catch((err) => {
          res.status(500).send({ ...err });
        });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export { validateEmail };
