import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import faker from "faker";
import { Users } from "../Models/User.js";

const generateFakeRole = () => {
  const roles = ["admin", "manager"];
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
};

const generateFakeUser = () => {
  const fakeUser = {
    id: uuidv4(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    role: generateFakeRole(),
    user_name: faker.internet.userName(),
    pwd: faker.internet.password(),
    creation_date: faker.date.recent(),
    last_login: faker.date.past(),
    active: faker.datatype.boolean(),
  };
  return fakeUser;
};

const generateFakeUsers = (numUsers) => {
  const fakeUsers = [];
  for (let i = 0; i < numUsers; i++) {
    fakeUsers.push(generateFakeUser());
  }
  return fakeUsers;
};

const insertFakeUsers = async (numUsers) => {
  try {
    const fakeUsers = generateFakeUsers(numUsers);
    insertedUsers = await Users.insertMany(fakeUsers);
    console.log(`${numUsers} fake users inserted successfully.`);
    return insertedUsers;
  } catch (error) {
    console.error("Error inserting fake users:", error.message);
  }
};

export { insertFakeUsers };
