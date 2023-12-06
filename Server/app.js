import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

import dotenv from "dotenv";
import { usersRouter } from "./Routes/userRouter.js";
import { PORT } from "./Config/env.js";
import { connecting } from "./Config/database.js";
import { Users } from "./Models/User.js";
import { customerRouter } from "./Routes/customerRouter.js";

import { categoryRouter } from "./Routes/categoryRouter.js";
import { subcategoryRouter } from "./Routes/subcategoryRouter.js";
import { productRouter } from "./Routes/productRouter.js";
import { countRouter } from "./Routes/statisticsRouter.js";
import { verifyRouter } from "./Routes/verifyRouter.js";
import { orderRouter } from "./Routes/orderRouter.js";
import { insertSubcategories } from "./fakeData/subcategoriesFakeData.js";

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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(passport.initialize());
app.use(passport.session());

import("./Config/passport.js");

app.use("/v1/users", usersRouter);
app.use("/v1/categories", categoryRouter);
app.use("/v1/subcategories", subcategoryRouter);
app.use("/v1/orders", orderRouter);

app.use("/v1/customers", customerRouter);
app.use("/v1/products", productRouter);
app.use("/verify", verifyRouter);
app.use("/v1/count", countRouter);
connecting().then(() => {
  Users.find().then((data) => console.log(data));
});

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(PORT, () => console.log("listening" + PORT));
