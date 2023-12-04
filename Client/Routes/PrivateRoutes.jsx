import Home from "../src/Pages/Home";
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
];

export { PrivateRoutes };
