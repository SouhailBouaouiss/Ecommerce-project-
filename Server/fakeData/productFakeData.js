import faker from "faker";
import { v4 as uuidv4 } from "uuid";
import { Subcategory } from "../Models/Subcategogy.js";
import { Products } from "../Models/Product.js";

const imageUrls = [
  "https://lnkobrand.com/cdn/shop/files/celeste-lunettes-de-vue-et-lunettes-de-soleil-au-39400802222336.jpg?v=1697751813&width=1080",
  "https://lnkobrand.com/cdn/shop/files/seameet-lunettes-de-vue-et-lunettes-de-soleil-au-39500005441792.jpg?v=1699435529&width=1080",
  "https://lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298503936.jpg?v=1702638087&width=1080",
  "https://lnkobrand.com/cdn/shop/files/cristal-palace-lunettes-de-vue-et-lunettes-de-soleil-au-39717306302720.jpg?v=1702638268&width=1080",
  "https://lnkobrand.com/cdn/shop/files/pinelight-lunettes-de-vue-et-lunettes-de-soleil-au-39753830498560.jpg?v=1703169988&width=600",
  "https://lnkobrand.com/cdn/shop/files/sleekcoast-lunettes-de-vue-et-lunettes-de-soleil-au-39753067168000.jpg?v=1703155408&width=1080",
  "https://lnkobrand.com/cdn/shop/files/freyfield-lunettes-de-vue-et-lunettes-de-soleil-au-39752993571072.jpg?v=1703154508&width=1080",
  "https://lnkobrand.com/cdn/shop/files/fallshore-lunettes-de-vue-et-lunettes-de-soleil-au-39753001664768.jpg?v=1703154704&width=1080",
  "https://lnkobrand.com/cdn/shop/files/tarnstead-lunettes-de-vue-et-lunettes-de-soleil-au-39752887271680.jpg?v=1703153434&width=1080",
  "https://lnkobrand.com/cdn/shop/files/darkwell-lunettes-de-vue-et-lunettes-de-soleil-au-39493520097536.jpg?v=1699357416&width=1080",
  "https://lnkobrand.com/cdn/shop/files/seameet-lunettes-de-vue-et-lunettes-de-soleil-au-39500005441792.jpg?v=1699435529&width=1080",
  "https://lnkobrand.com/cdn/shop/files/pavv-lunettes-de-vue-et-lunettes-de-soleil-au-39493507219712.jpg?v=1699357234&width=1080",
  "https://lnkobrand.com/cdn/shop/files/hillfar-lunettes-de-vue-et-lunettes-de-soleil-au-39489606942976.jpg?v=1699308101&width=1080",
  "https://lnkobrand.com/cdn/shop/files/cullfield-lunettes-de-vue-et-lunettes-de-soleil-au-39489591116032.jpg?v=1699307923&width=1080",
];

const guessSubcategoryId = async (subcategoriesIds) => {
  try {
    const subcategoryId =
      subcategoriesIds[Math.floor(Math.random() * subcategoriesIds.length)];
    return subcategoryId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const generateFakeProduct = async (subcategoriesIds) => {
  try {
    const randomImageUrl =
      imageUrls[Math.floor(Math.random() * imageUrls.length)];

    const fakeProduct = {
      sku: faker.random.alphaNumeric(10),
      product_image: randomImageUrl, // Use the random image URL
      product_name: faker.commerce.productName(),
      subcategory_id: await guessSubcategoryId(subcategoriesIds),
      short_description: faker.lorem.words(10),
      long_description: faker.lorem.paragraph(),
      price: faker.random.number({ min: 10, max: 100 }),
      discount_price: faker.random.number({ min: 5, max: 20 }),
      quantity: faker.random.number({ min: 1, max: 100 }),
      options: [faker.random.word(), faker.random.word()],
      active: faker.random.boolean(),
    };

    return fakeProduct;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const generateFakeProducts = async (num, ids) => {
  const fakeProducts = [];
  for (let i = 0; i < num; i++) {
    fakeProducts.push(await generateFakeProduct(ids));
  }
  return fakeProducts;
};

const insertFakeProducts = async (num) => {
  try {
    const subcategoriesIds = await Subcategory.find().select("_id");
    const fakeProducts = await generateFakeProducts(num, subcategoriesIds);
    return await Products.insertMany(fakeProducts);
  } catch (error) {
    console.error("Error inserting fake products:", error.message);
  }
};

export { insertFakeProducts };
