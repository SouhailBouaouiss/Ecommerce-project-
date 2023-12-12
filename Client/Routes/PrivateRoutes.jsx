import Customer from "../src/Pages/Customer";
import Home from "../src/Pages/Home";
import Order from "../src/Pages/Order";
import Product from "../src/Pages/Product";

const PrivateRoutes = [
  {
    id: 1,
    path: "/home",
    element: <Home />,
  },
  {
    id: 2,
    path: "/product",
    element: <Product />,
  },
  {
    id: 3,
    path: "/customer",
    element: <Customer />,
  },
  {
    id: 5,
    path: "/order",
    element: <Order />,
  },
  // {
  //   id: 3,
  //   path: "/user",
  //   element: <User />,
  // },
];
export { PrivateRoutes };
