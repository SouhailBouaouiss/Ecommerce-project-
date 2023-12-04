import mongoose from "mongoose";
import faker from "faker";
import { v4 as uuidv4 } from "uuid";
import { Subcategory } from "../Models/Subcategogy.js";
import { Category } from "../Models/Category.js";

const generateFakeSubcategory = (categoryIds) => {
  const fakeSubcategory = {
    id: uuidv4(),
    subcategory_name: faker.commerce.productAdjective(),
    active: faker.datatype.boolean(),
    category_id: categoryIds[Math.floor(Math.random() * categoryIds.length)],
    products: [], // Assuming you want to generate products later
  };

  return fakeSubcategory;
};

const genrateFakeSubcategories = (numSubcategories, categoryIds) => {
  const fakeSubcategories = [];

  for (let i = 0; i < numSubcategories; i++) {
    fakeSubcategories.push(generateFakeSubcategory(categoryIds));
  }
  return fakeSubcategories;
};

const retrieveCategoryIds = async () => {
  const categoryIds = Category.find().select("category_id");
  return categoryIds;
};

const insertSubcategories = async (numSubcategories) => {
  try {
    const categoryIds = await retrieveCategoryIds();
    console.log(categoryIds);
    const subcategories = genrateFakeSubcategories(
      numSubcategories,
      categoryIds
    );

    const insertSubcategories = await Subcategory.insertMany(subcategories);

    return insertSubcategories;
  } catch (error) {
    console.error("Error inserting fake subcategories:", error.message);
  }
};

export { generateFakeSubcategory, retrieveCategoryIds, insertSubcategories };
