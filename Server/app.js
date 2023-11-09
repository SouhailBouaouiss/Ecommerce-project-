import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import cookieParser from "cookie-parser";

const app = express();

import dotenv from "dotenv";

dotenv.config();
app.use(cookieParser());

app.use(
  session({
    secret: "HGBJdsofldsg26",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session);
