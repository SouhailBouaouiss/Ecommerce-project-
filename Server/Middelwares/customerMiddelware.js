const verifyCustomer = (req, res, next) => {
  const { role } = req.data;
  if (role == "customer") {
    return next();
  }
  res.status(403).send({ message: "you don't have enough privilege" });
  return;
};

const checkEmailValidation = (req, res, next) => {
  const { valid_email } = req.data;
  if (valid_email == true) {
    return next();
  }
  res.status(403).send({ message: "you don't have enough privilege" });
  return;
};

export { verifyCustomer, checkEmailValidation };
