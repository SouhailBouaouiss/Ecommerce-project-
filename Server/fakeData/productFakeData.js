import faker from "faker";
import { v4 as uuidv4 } from "uuid";
import { Subcategory } from "../Models/Subcategogy.js";
import { Products } from "../Models/Product.js";

const generateFakeProduct = async () => {
  const fakeProduct = {
    sku: faker.random.alphaNumeric(10), // Example: ABC123
    product_image: faker.image.imageUrl(),
    product_name: faker.commerce.productName(),
    subcategory_id: await guessSubcategoryId(), // Replace with a valid subcategory ID
    short_description: faker.lorem.words(10),
    long_description: faker.lorem.paragraph(),
    price: faker.random.number({ min: 10, max: 100 }),
    discount_price: faker.random.number({ min: 5, max: 20 }),
    quantity: faker.random.number({ min: 1, max: 100 }),
    options: [faker.random.word(), faker.random.word()],
    active: faker.random.boolean(),
  };

  return fakeProduct;
};

const guessSubcategoryId = async () => {
  try {
    const subcategoriesIds = await Subcategory.find().select("_id");
    const subcategoryId =
      subcategoriesIds[Math.floor(Math.random() * subcategoriesIds.length)];
    return subcategoryId;
  } catch (error) {
    console.log(error);
  }
};

const generateFakeProducts = async (num) => {
  const fakeProducts = [];
  for (let i = 0; i < num; i++) {
    fakeProducts.push(await generateFakeProduct());
  }
  return fakeProducts;
};

const insertFakeProducts = async (num) => {
  try {
    const fakeProducts = await generateFakeProducts(num);
    return await Products.insertMany(fakeProducts);
  } catch (error) {
    console.error("Error inserting fake products:", error.message);
  }
};

export { insertFakeProducts };
