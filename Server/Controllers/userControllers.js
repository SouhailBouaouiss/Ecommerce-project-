// Send the access token and the user data

const signin = (req, res, next) => {
  const { generatedAccessToken, generatedRefreshToken } = req.jwt;
  const now = new Date().toLocaleDateString();
  const { _id } = req.user;

  Users.findOneAndUpdate({ _id }, { last_login: now }, { new: true })
    .select("-pwd")
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "invalid user id" });
      }
      res
        .status(200)
        .cookies(
          {
            access_token: generatedAccessToken,
            path: "/",
            domaine: "localhost",
            httpOnly: true,
            secure: false,
          },
          {
            refresh_token: generatedRefreshToken,
            path: "/",
            domaine: "localhost",
            httpOnly: true,
            secure: false,
          }
        )
        .send({
          access_token: generatedAccessToken,
          refresh_token: generatedRefreshToken,
          user: data,
        });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

// Creat a user document

const creatUser = (req, res, next) => {
  const { email, firstName, lastName, userName, role, pwd } = req.body;

  const newUser = new User({
    email,
    first_name,
    last_name,
    user_name,
    role,
    active: true,
    creationDate,
    last_login: "",
    last_update: "",
    pwd,
  });

  newUser
    .save()
    .then((user) =>
      res.status(201).send({ message: "user created successfully" })
    )
    .catch((err) => res.status(400).send(err));
};

// Retrieve users data from the db

const getUsersData = (req, res, next) => {
  const page = req.query.page || 1;
  User.find({})
    .select("-pwd")
    .skip((page - 1) * 10)
    .limit(10)
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
  const { id } = req.params;
  User.findOne({ id })
    .select("-pwd")
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "user not found" });
      }

      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
      return;
    });
};

// Retrieve users data based on serach

const getUserSearch = (req, res, next) => {
  const page = req.query.page || 1;
  const { query } = req.query;
  Users.find({ $text: { $search: query } })
    .skip((page - 1) * 10)
    .limit(10)
    .then((data) => {
      res.status(200).send({ data });
    });
};

// Update user's data based on id

const updateUserData = (req, res, next) => {
  const { id } = req.params;
  const DataToUpdate = req.body;
  User.findOneAndUpdate({ id }, { DataToUpdate })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "invalid user id" });
      }
      res.status(200).send({ message: "user updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

// Delete a user based on id

const deleteUser = (req, res, next) => {
  const { id } = req.params;
  User.deleteOne({ id })
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

export {
  signin,
  creatUser,
  getUsersData,
  getOneUserData,
  getUserSearch,
  updateUserData,
  deleteUser,
};