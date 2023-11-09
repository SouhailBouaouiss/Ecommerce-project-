// Send the access token and the user data

const signin = (req, res, next) => {
  const generatedToken = req.jwt;
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

// Creat a user document

const creatUser = (req, res, next) => {
  const { email, firstName, lastName, userName, role } = req.body;

  const newUser = new User({
    email,
    firstName,
    lastName,
    userName,
    role,
    active: true,
    creationDate,
    lastLogin: "",
    lastUpdate: "",
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

export { signin, creatUser, getUsersData };
