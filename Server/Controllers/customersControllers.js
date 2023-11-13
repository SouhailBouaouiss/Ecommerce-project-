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
  const newCustomer = new Customer(req.body);

  newCustomer.save
    .then((customer) =>
      res.statuts(201).send({ message: "customer created successfully" })
    )
    .catch((err) => res.status(400).send(err));
};

// Retrieve customers data from the db

const getCustomersData = (req, res, next) => {
  const page = req.query.page || 1;
  Customers.find({})
    .select("-pwd")
    .skip((page - 1) * 10)
    .limit(10)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "No customer found" });
      }
      res.status(200).send({ data: data });
      return;
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
      return;
    });
};

// Retrieve customers data based on serach

const getCustomerSearch = (req, res, next) => {
  const page = req.query.page || 1;
  const { query } = req.query;
  Customers.find({ $text: { $search: query } })
    .skip((page - 1) * 10)
    .limit(10)
    .then((data) => {
      res.status(200).send({ data });
    });
};

// Retrieve specific customer data

const getOneCustomerData = (req, res, next) => {
  const { id } = req.params;
  Customers.findOne({ id })
    .select("-pwd")
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "customer not found" });
      }

      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
      return;
    });
};

// Update customer's data based on id

const updateCustomerData = (req, res, next) => {
  const { id } = req.params;
  const DataToUpdate = req.body;
  Customers.findOneAndUpdate({ id }, { DataToUpdate }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "invalid customer id" });
      }
      res.status(200).send({ message: "customer updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

export {
  signin,
  creatCustomer,
  getCustomersData,
  getCustomerSearch,
  getOneCustomerData,
  updateCustomerData,
};
