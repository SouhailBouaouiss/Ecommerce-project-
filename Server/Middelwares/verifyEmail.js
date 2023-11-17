import jwf from "jsonwebtoken";
import Customers from "../models/Customer.js";

import dotenv from "dotenv";

dotenv.config();

const validateEmail = (req, res) => {
  const tokenEmail = req.query.token;
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
