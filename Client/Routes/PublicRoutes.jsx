import LandingPage from "../src/Pages/LandingPage";
import SignInSignUp from "../src/Pages/SignInSignUp";
import SinglePage from "../src/Pages/SinglePage";

import BackgroundVideo from "../src/scenes/Dashbord/global/ShopFront/BackgroundVideo";
import ShoppingCart from "../src/scenes/Dashbord/global/ShopFront/ShoppingCart";
import UpBar from "../src/scenes/Dashbord/global/ShopFront/UpBar";

const PublicRoutes = [
  // {
  //   id: 1,
  //   path: "/",
  //   element: <AuthServices />,
  // },
  {
    id: 2,
    path: "/bar",
    element: <UpBar />,
  },
  {
    id: 3,
    path: "/vd",
    element: <BackgroundVideo />,
  },
  {
    id: 4,
    path: "/ld",
    element: <LandingPage />,
  },
  {
    id: 5,
    path: "/sc",
    element: <ShoppingCart />,
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
];

export { PublicRoutes };
