import { Products } from "../Models/Product.js";
import { Category } from "../Models/Category.js";
import { Customers } from "../Models/customer.js";

const getStatistics = async (req, res, next) => {
  const productsCount = await Products.countDocuments();

  const CategoryCount = await Category.countDocuments();

  const customerCount = await Customers.countDocuments();
  res.send({
    data: {
      products: productsCount,
      customers: customerCount,
      categories: CategoryCount,
    },
  });
};

export { getStatistics };
