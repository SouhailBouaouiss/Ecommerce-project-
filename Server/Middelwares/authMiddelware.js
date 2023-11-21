import jwt from "jsonwebtoken";
import { jwtSecret, refSecret } from "../Config/env.js";
import validate from "express-validator";
import { allowedRoles } from "../utils.js";
import passport from "passport";
import { Users } from "../Models/User.js";

const tokenGenration = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log("err", err);
      return res.status(401).send(err);
    }
    if (user) {
      // Genrate an access token to the authenticated User
      console.log(user);
      const generatedAccessToken = jwt.sign({ _id: user._id }, jwtSecret, {
        expiresIn: "1h",
      });
      // Genrate an refresh token to the authenticated User
      const generatedRefreshToken = jwt.sign({ _id: user._id }, refSecret, {
        expiresIn: "2d",
      });
      req.user = user;

      console.log(req.user);

      req.jwt = { generatedAccessToken, generatedRefreshToken };
      next();
    } else {
      res.status(401).json(info);
    }
  })(req, res, next);
};

const expressValidatorCheck = (req, res, next) => {
  const errors = validate.validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Process the request if validation passes
  // console.log(`Registered user: ${email}`);
  next();
};

// Verify authentication by verifying the token sent in head of request
const verifyAuth = async (req, res, next) => {
  console.log("hona");
  const token =
    // req.headers.authorization?.split(" ")[1] ??
    req.cookies.access_token; // Grab it from Cookies
  if (!token) return next({ status: 401, message: "Invalid JWT token" });
  try {
    const decodedUserData = jwt.verify(token, jwtSecret);
    console.log(decodedUserData);

    const data = await Users.findById({ _id: decodedUserData._id });
    delete data.pwd
    req.data = data;
    return next();
  } catch (error) {
    console.log("here 0");
    req.data = null;
    return next();
  }
};

// Verify refresh token

const verifyRefreshToken = async (req, res, next) => {
  try {
    console.log("here");
    if (!req.data) {
      console.log("here 1");
      const { refresh_token } = req.cookies;
      console.log(refresh_token);

      const decodedUserData = jwt.verify(refresh_token, refSecret);
      console.log(decodedUserData);
      const generatedAccessToken = jwt.sign(
        { _id: decodedUserData._id },
        jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("access_token", generatedAccessToken, {
        path: "/",
        domaine: "localhost",
        httpOnly: true,
        secure: false,
      });
      const data = await Users.findById({ _id: decodedUserData._id });
      req.data = data;
      return next();
    }
    console.log("here 2");
    return next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token 2" });
  }
};
// Verify anthenticated user's role

const verifyAdmin = (req, res, next) => {
  console.log(req.data);
  const { role } = req.data;
  console.log(role);
  if (role == "admin") {
    return next();
  }
  res.status(403).send({ message: "you don't have enough privilege" });
  return;
};

// Verify wether the user is an admin or manager
const verifyManagerOrAdmin = (req, res, next) => {
  const { role } = req.data;
  console.log(role);
  if (allowedRoles.includes(role)) {
    return next();
  }
  res.status(403).send({ message: "you don't have enough privilege" });
  return;
};

// Verify customer
const verifyCustomer = (req, res, next) => {
  const { role } = req.data;
  if (role) {
    res.status(403).send({ message: "you are not a customer" });
    return;
  }

  return next();
};

// Verify email validation
const checkValidation = (req, res, next) => {
  const { valid_account } = req.data;
  if (valid_account == false) {
    res.status(403).send({ message: "you don't have enough privilege" });
    return;
  }
  next();
};

export {
  tokenGenration,
  expressValidatorCheck,
  verifyAuth,
  verifyAdmin,
  verifyManagerOrAdmin,
  verifyCustomer,
  checkValidation,
  verifyRefreshToken,
};
