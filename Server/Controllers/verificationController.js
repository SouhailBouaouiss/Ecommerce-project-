const sendUpdatedData = (req, res, next) => {
  const data = req.data;
  console.log(req.data);
  res
    .status(200)
    .send({ message: "the user is already authenticated", user: data });
};

export { sendUpdatedData };
