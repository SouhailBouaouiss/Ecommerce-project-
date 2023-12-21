import LandingPage from "../src/Pages/LandingPage";
import AuthServices from "../src/Pages/authServices";
import BackgroundVideo from "../src/scenes/Dashbord/global/BackgroundVideo";
import UpBar from "../src/scenes/Dashbord/global/UpBar";

const PublicRoutes = [
  {
    id: 1,
    path: "/",
    element: <AuthServices />,
  },
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
];

export { PublicRoutes };
