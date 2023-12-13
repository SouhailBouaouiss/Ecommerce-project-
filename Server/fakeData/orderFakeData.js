import faker from "faker";
import { v4 as uuidv4 } from "uuid";
import { Customers } from "../Models/customer.js";
import { Products } from "../Models/Product.js";
import { Order } from "../Models/Order.js";

const generateFakeOrder = async () => {
  const fakeOrder = {
    id: uuidv4(),
    customer_id: await guessCustomerId(),
    order_items: await guessOrderItems(10),
    order_date: faker.date.past(),
    status: guessStatus(),
  };

  return fakeOrder;
};
// Generate a single customerId

const guessCustomerId = async () => {
  try {
    const customersIds = await Customers.find().select("_id");
    const customerId =
      customersIds[Math.floor(Math.random() * customersIds.length)];
    return customerId;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

// Generate an array of products

const guessOrderItems = async (maxNum) => {
  try {
    const orderItems = [];
    const productsIds = await Products.find().select("_id");
    const numProducts = Math.floor(Math.random() * maxNum) + 1;
    for (let i = 0; i < numProducts; i++) {
      const randomProductId =
        productsIds[Math.floor(Math.random() * productsIds.length)];
      orderItems.push(randomProductId);
    }
    return orderItems;
  } catch (error) {
    console.log(error);
  }
};

// Generate a random status

const guessStatus = () => {
  const statusArray = ["pending", "processing", "shipped", "delivered"];
  const randomStatus =
    statusArray[Math.floor(Math.random() * statusArray.length)];
  return randomStatus;
};

// Genarate fake orders

const generateFakeOrders = async (numOrders) => {
  const fakeOrders = [];
  for (let i = 0; i < numOrders; i++) {
    fakeOrders.push(await generateFakeOrder());
  }
  return fakeOrders;
};

// Insert fakeOrders
const insertOrders = async (numOrders) => {
  try {
    const fakeOrders = await generateFakeOrders(numOrders);
    return await Order.insertMany(fakeOrders);
  } catch (error) {
    console.error("Error inserting fake orders:", error.message);
  }
};

export { insertOrders };
