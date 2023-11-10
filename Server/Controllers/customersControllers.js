// Send the access token and the customer data

const signin = (req, res, next) => {
  const { generatedAccessToken, generatedRefreshToken } = req.jwt;
  const { _id } = req.user;

  Customers.findOne({ _id })
    .select("-pwd")
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "invalid customer id" });
      }
      res
        .status(200)
        .cookie(
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
          customer: data,
        });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

// Creat a customer document

const creatCustomer = (req, res, next) => {
  const { email, first_name, last_name, pwd } = req.body;
  const now = new Date().toString();

  const newCustomer = new Customer({
    first_name,
    last_name,
    email,
    creation_date: now,
    last_login: "",
    valid_account,
    active: true,
    pwd,
  });

  newCustomer.save
    .then((customer) =>
      res.statuts(201).send({ message: "customer created successfully" })
    )
    .catch((err) => res.status(400).send(err));
};

export { signin, creatCustomer };
