import React, { useContext, useEffect } from "react";
import { UserContext } from "../src/contexts/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthServices from "../src/Pages/authServices";
import { toast } from "react-toastify";
import Sidebar from "../src/scenes/Dashbord/Sidebar";
import Navbar from "../src/scenes/Dashbord/Navbar";
import { ColorModeContext, useMode } from "../src/theme";
import Header from "../src/scenes/Dashbord/Navbar";
import IndexNavbar from "../src/scenes/Dashbord/Navbar";
import ExamplesNavbar from "../src/scenes/Dashbord/Navbar";

function PrivateRouteAccess() {
  console.log("Private route");
  // Import the user context
  const user = useContext(UserContext);

  // Config the useNavigate

  const navigate = useNavigate();
  const { isConnected } = user.user;

  useEffect(() => {
    console.log(isConnected);

    if (isConnected == false) {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      axios
        .post(
          "http://localhost:5001/verify",
          { refresh_token },
          { headers: { Authorization: `Bearer ${access_token}` } }
        )
        .then((resp) => {
          const data = resp.data;

          user.setUser({
            isConnected: true,
            data: {
              ...data.user,
              token: data.access_token,
            },
          });

          toast.success(data.message);
          return;
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
          return navigate("/");
        });
    }
  }, [isConnected]);

  if (isConnected == true) {
    return (
      <>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
}

export default PrivateRouteAccess;
