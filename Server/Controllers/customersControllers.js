// Send the access token and the customer data

import { Customers } from "../Models/customer.js";

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
          user: data,
        });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

// Creat a customer document

const createNewCustomer = (req, res, next) => {
  Customers.create(req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "email or user_name already exists" });
        return;
      }
      res.status(201).send({ message: "customer created successfully" });
      return;
    })
    .catch((err) => {
      res.status(500).send();
    });
};

// Retrieve customers data from the db

const getCustomersData = (req, res, next) => {
  const page = req.query.page || 1;
  Customers.find()
    .select("-pwd")
    .skip((page - 1) * 10)
    .limit(10)
    .then((data) => {
      res.status(200).send({ data });
      return;
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal Server Error", ...err });
      return;
    });
};

// Retrieve customers data based on serach

const getCustomerSearch = (req, res, next) => {
  const page = req.query.page || 1;
  let sort = "DESC";

  if (req.query.sort == "DESC" || req.query.sort == "ASC") {
    sort = req.query.sort;
  }

  const { query } = req.query;
  Customers.find({ $text: { $search: query } })
    .skip((page - 1) * 10)
    .limit(10)
    .sort(sort)
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send(err);
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
      res.status(500).send({ message: "Internal Server Error", ...err });
      return;
    });
};

// Update customer's data based on id

const updateCustomerData = (req, res, next) => {
  const { id } = req.params;
  const DataToUpdate = req.body;
  Customers.findOneAndUpdate({ id }, DataToUpdate)
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

// Delete a customer based on id

const deleteCustomer = (req, res, next) => {
  const { id } = req.params;
  Customers.deleteOne({ id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "invalid customer id" });
      }
      res.status(200).send({ message: "customer deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: " Internal Server Error", ...err });
    });
};

// get customer data

const getCustomerData = (req, res, next) => {
  res.status(200).send(req.data);
};

export {
  signin,
  createNewCustomer,
  getCustomersData,
  getCustomerSearch,
  getOneCustomerData,
  updateCustomerData,
  deleteCustomer,
  getCustomerData,
};
