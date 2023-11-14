// Add new order

const addOrder = (req, res, next) => {
  Products.create(req.body).then((data) => {
    if (!data) {
      res.status(500).send({ message: "internal server " });
      return;
    }
    res.status(201).send({ message: "order added successfully" });
    return;
  });
};

// List all orders

const getAllOrders = (req, res, next) => {
  const page = req.query || 1;
  Order.find()
    .populate({
      path: "customer_id",
      options: {
        limit: 10,
        skip: (page - 1) * 10,
        select: "-pwd first-name last-name",
      },
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No orders found", data: [] });
        return;
      }
      res.status(200).send({ data });
    });
};

// Get a specific order using id

const getOrderById = (req, res, next) => {
  const { id } = req.body;
  Order.findOne({ id })
    .populate({
      path: "customer_id",
      options: {
        select: "-pwd first-name last-name",
      },
    })
    .populate(" order_items")
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No orders found", data: [] });
        return;
      }
      res.status(200).send({ data });
    });
};

export { addOrder, getAllOrders, getOrderById };