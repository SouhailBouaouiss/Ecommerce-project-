import { Products } from "../Models/Product.js";
import { Order } from "../Models/Order.js";

// Add new order

const addOrder = (req, res, next) => {
  const { customer_id } = req.data;
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
  const page = req.query.page || 1;
  console.log("in");
  Order.find().then((data) => {
    console.log("orders", data);
    if (!data) {
      res.status(404).send({ message: "No orders found", data: [] });
      return;
    }
    res.status(200).send({ data });
  });
};

// Get a specific order using id

const getOrderById = (req, res, next) => {
  const { id } = req.params;
  Order.findById(id)
    .populate("customer_id", "-pwd")
    .populate("order_items")
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(404).send({ message: "No orders found", data: [] });
        return;
      }
      res.status(200).send({ data, message: "Details fetched successfully" });
    })
    .catch((err) => console.log(err));
};

export { addOrder, getAllOrders, getOrderById };
