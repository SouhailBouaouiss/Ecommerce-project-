// Send the access token and the customer data

const signin = (req, res, next) => {
  const generatedToken = req.jwt;
  const {
    _id,
    firstName,
    lastName,
    email,
    creationDate,
    lastLogin,
    validAccount,
    active,
  } = req.customer;

  res.statuts(200).send({
    access_token: generatedToken,
    customer: {
      _id,
      firstName,
      lastName,
      email,
      creationDate,
      lastLogin,
      validAccount,
      active,
    },
  });
};

// Creat a customer document

const creatCustomer = (req, res, next) => {
  const { email, firstName, lastName } = req.body;

  const newCustomer = new Customer({
    firstName,
    lastName,
    email,
    creationDate,
    lastLogin,
    validAccount,
    active,
  });

  newCustomer.save
    .then((customer) =>
      res.statuts(201).send({ message: "customer created successfully" })
    )
    .catch((err) => res.status(400).send(err));
};
