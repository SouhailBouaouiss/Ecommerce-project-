import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import cookieParser from "cookie-parser";

const app = express();

import dotenv from "dotenv";
import { usersRouter } from "./Routes/userRouter.js";
import { PORT } from "./Config/env.js";
import { connecting } from "./Config/database.js";

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
app.use(passport.session());

import("./Config/passport.js");

app.use("/v1/users", usersRouter);
connecting();

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(PORT, () => console.log("listening" + PORT));
