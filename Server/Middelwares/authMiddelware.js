import jwt, { sign } from "jsonwebtoken";
import { jwtSecret } from "../Config/env";
import { body, validationResult } from "express-validator";

const signin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: "Wrong Credentials" });
  }
  // Destruct data from req.user

  const {
    _id,
    email,
    firstName,
    lastName,
    userName,
    role,
    creationDate,
    lastLogin,
    lastUpdate,
    active,
  } = req.user;

  // Genrate a token to the authenticated User

  const generatedToken = sign(
    JSON.stringify({
      _id,
      email,
      firstName,
      lastName,
      userName,
      role,
      creationDate,
      lastLogin,
      lastUpdate,
      active,
    }),
    jwtSecret
  );

  res.status(200).send({
    access_token: generatedToken,
    user: {
      _id,
      email,
      firstName,
      lastName,
      userName,
      role,
      creationDate,
      lastLogin,
      lastUpdate,
      active,
    },
  });
};

const credentialsValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Process the request if validation passes
  console.log(`Registered user: ${email}`);
  next();
};

export { signin, credentialsValidation };
