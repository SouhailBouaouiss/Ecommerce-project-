// Send the access token and the user data

import { Users } from "../Models/User.js";

const signin = async (req, res, next) => {
  const { generatedAccessToken, generatedRefreshToken } = req.jwt;
  const now = new Date().toString();

  const { _id } = req.user;

  Users.findByIdAndUpdate(_id, { last_login: now }, { new: true })
    .select("-pwd")
    .then((data) => {
      console.log("data", data);
      if (!data) {
        return res.status(404).send({ message: "invalid user id" });
      }
      res
        .status(200)
        .cookie("access_token", generatedAccessToken, {
          // path: "/",
          domaine: "localhost",
          // httpOnly: true,
          secure: false,
        })
        .cookie("refresh_token", generatedRefreshToken, {
          // path: "/",
          domaine: "localhost",
          // httpOnly: true,
          secure: false,
        })
        .send({
          message: "Successfull authentication",
          access_token: generatedAccessToken,
          refresh_token: generatedRefreshToken,
          user: data,
        });
    })
    .catch((err) => {
      console.log("In updating err: ", err);
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

// Creat a user document

const creatUser = (req, res, next) => {
  const now = new Date().toDateString();

  const newUser = new Users(req.body);

  newUser
    .save()
    .then((user) => {
      req.userData = user;
      // res.status(201).send({ message: "user created successfully" }); //
      return next();
    })
    .catch((err) => res.status(400).send(err));
};

// Retrieve users data from the db

const getUsersData = (req, res, next) => {
  const page = req.query.page || 1;
  Users.find({})
    // .skip((page - 1) * 10)
    // .limit(10)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "No user found" });
      }
      res.status(200).send({ data: data });
      return;
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
      return;
    });
};

// Retrieve specific user data

const getOneUserData = (req, res, next) => {
  console.log("ins");
  const { id } = req.params;
  console.log(id);
  Users.findOne({ _id: id })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "user not found ohhh aahhahaha ohhhhh" });
      }

      return res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error2", ...err });
      return;
    });
};

// Retrieve users data based on serach

const getUserSearch = (req, res, next) => {
  const page = req.query.page || 1;
  const { query } = req.query;
  console.log(query);
  Users.find({
    $or: [
      { first_name: { $regex: new RegExp(query, "i") } },
      { last_name: { $regex: new RegExp(query, "i") } },
      { user_name: { $regex: new RegExp(query, "i") } },
    ],
  })
    .skip((page - 1) * 10)
    .limit(10)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "ach hadchi kanchouf anari nari" });
        return;
      }
      return res.status(200).send({ data });
    })
    .catch((err) =>
      res.status(800).send({ message: "dkchi li kayn khouya souhail" })
    );
};

// Update user's data based on id

const updateUserData = (req, res, next) => {
  const { id } = req.params;
  const DataToUpdate = req.body;
  console.log("id", id);
  Users.findOneAndUpdate({ _id: id }, DataToUpdate, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "invalid user id" });
      }
      res.status(200).send({ message: "user updated successfully", data });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

// Delete a user based on id

const deleteUser = (req, res, next) => {
  const { id } = req.params;
  console.log("Id", id);
  Users.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "invalid user id" });
      }
      res.status(200).send({ message: "user deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

// Logout a user

const logoutUser = (req, res, next) => {
  console.log("Hey");
  res.cookie("access_token", "", { expires: new Date(0) });
  res.cookie("refresh_token", "", { expires: new Date(0) });

  res.json({ success: true });
};

export {
  signin,
  creatUser,
  getUsersData,
  getOneUserData,
  getUserSearch,
  updateUserData,
  deleteUser,
  logoutUser,
};
