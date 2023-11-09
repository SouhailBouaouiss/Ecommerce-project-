import { sign, verify } from "jsonwebtoken";
import { jwtSecret } from "../Config/env";
import { body, validationResult } from "express-validator";

const tokenGenration = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(401).json(err);
    }
    if (user) {
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
      req.jwt = generatedToken;
      next();
    } else {
      res.status(401).json(info);
    }
  })(req, res, next);
};

const expressValidatorCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Process the request if validation passes
  console.log(`Registered user: ${email}`);
  next();
};

// Verify authentication by verifying the token sent in head of request

const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next({ status: 401, message: "Invalid JWT token" });
  try {
    const decodedUserData = verify(token, jwtSecret);
    req.data = decodedUserData;

    next();
  } catch (error) {
    res.status(404).send(error);
  }
};

// Verify anthenticated user's role

const verifyAdmin = (req, res, next) => {
  const { role } = req.data;
  if (role == "admin") {
    return next();
  }
  res.status(403).send({ message: "you don't have enough privilege" });
  return;
};

// Verify wether the user is an admin or manager
const verifyManagerOrAdmin = (req, res, next) => {
  const { role } = req.data;
  if (role == "admin" || role == "manager") {
    return next();
  }
  res.status(403).send({ message: "you don't have enough privilege" });
  return;
};

export {
  tokenGenration,
  expressValidatorCheck,
  verifyAuth,
  verifyAdmin,
  verifyManagerOrAdmin,
};
