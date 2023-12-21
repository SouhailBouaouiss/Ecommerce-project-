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

// Get orders sorted by their creation mounth

const getOrdersByMounth = async (req, res, next) => {
  try {
    const result = await Order.aggregate([
      {
        $project: {
          year: { $year: "$order_date" },
          month: { $month: "$order_date" },
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
          },
          totalOrders: { $sum: 1 }, // Count the number of orders per month
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.send({
      data: result,
      message: "orders per mounth are retrieved succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateOrderData = (req, res, next) => {
  const { id } = req.params;
  const DataToUpdate = req.body;
  console.log("id", id);
  Order.findOneAndUpdate({ _id: id }, DataToUpdate, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "invalid order id" });
      }
      res.status(200).send({ message: "order updated successfully", data });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

export {
  addOrder,
  getAllOrders,
  getOrderById,
  getOrdersByMounth,
  updateOrderData,
};
