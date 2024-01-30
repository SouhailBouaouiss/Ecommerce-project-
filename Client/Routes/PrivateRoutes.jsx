import Customer from "../src/Pages/Customer";
import Home from "../src/Pages/Home";

import Order from "../src/Pages/Order";
import Product from "../src/Pages/Product";
import User from "../src/Pages/user";

const PrivateRoutes = [
  {
    id: 1,
    path: "backoffice/dashboard",
    element: <Home />,
  },
  {
    id: 2,
    path: "backoffice/product",
    element: <Product />,
  },
  {
    id: 3,
    path: "backoffice/customer",
    element: <Customer />,
  },
  {
    id: 5,
    path: "backoffice/order",
    element: <Order />,
  },
  {
    id: 4,
    path: "backoffice/user",
    element: <User />,
  },
];
export { PrivateRoutes };
