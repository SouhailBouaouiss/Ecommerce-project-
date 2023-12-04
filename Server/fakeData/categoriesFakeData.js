import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import faker from "faker";
import { Category } from "../Models/Category.js";

const generateFakeCategory = () => {
  const fakeCategory = {
    id: uuidv4(),
    category_name: faker.commerce.department(),
    active: faker.random.boolean(),
    subCategories: [],
  };
  return fakeCategory;
};

const generateFakeCategories = (numCategories) => {
  const fakeCategories = [];
  for (let i = 0; i < numCategories; i++) {
    fakeCategories.push(generateFakeCategory());
  }
  console.log(fakeCategories);
  return fakeCategories;
};

const insertFakeCategories = async (numCategories) => {
  try {
    const fakeCategories = generateFakeCategories(numCategories);
    const insertedCategories = await Category.insertMany(fakeCategories);
    console.log(`${numCategories} fake categories inserted successfully.`);
    return insertedCategories;
  } catch (error) {
    console.error("Error inserting fake categories:", error.message);
  }
};

export { generateFakeCategories, generateFakeCategory, insertFakeCategories };
