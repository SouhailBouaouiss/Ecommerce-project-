import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import faker from "faker";
import { Customers } from "../Models/customer.js";

const generateFakeCustomer = () => {
  const fakeCustomer = {
    id: uuidv4(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    valid_account: faker.datatype.boolean(),
    pwd: faker.internet.password(),
    creation_date: faker.date.recent(),
    last_login: faker.date.past(),
    active: faker.datatype.boolean(),
  };
  return fakeCustomer;
};

const generateFakeCustomers = (numCustomers) => {
  const fakeCustomers = [];
  for (let i = 0; i < numCustomers; i++) {
    fakeCustomers.push(generateFakeCustomer());
  }

  return fakeCustomers;
};

const insertFakeCustomers = async (numCustomers) => {
  try {
    const fakeCustomers = generateFakeCustomers(numCustomers);
    const insertedCustomers = await Customers.insertMany(fakeCustomers);
    console.log(`${numCustomers} fake customers inserted successfully.`);
    return insertedCustomers;
  } catch (error) {
    console.error("Error inserting fake customers:", error.message);
  }
};

export { insertFakeCustomers, generateFakeCustomer, generateFakeCustomers };
