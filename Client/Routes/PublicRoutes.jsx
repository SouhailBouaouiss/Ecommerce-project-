import SignInSignUp from "../src/Pages/SignInSignUp";
import ProductsPage from "../src/Pages/ProductsPage";
import SinglePage from "../src/Pages/SinglePage";

import CustomerEditPage from "../src/Pages/CustomerEditPage";
import LandingPage from "../src/Pages/LandingPage";
import AuthServices from "../src/Pages/AuthServices";

const PublicRoutes = [
  // {
  //   id: 1,
  //   path: "/",
  //   element: <AuthServices />,
  // },
  {
    id: 4,
    path: "/landingpage",
    element: <LandingPage />,
  },
  {
    id: 7,
    path: "/product/:slug",
    element: <SinglePage />,
  },
  {
    id: 9,
    path: "/authentication",
    element: <SignInSignUp />,
  },
  {
    id: 8,
    path: "/productspage/:id",
    element: <ProductsPage />,
  },
  {
    id: 8,
    path: "/customer/edit",
    element: <CustomerEditPage />,
  },
];

export { PublicRoutes };
