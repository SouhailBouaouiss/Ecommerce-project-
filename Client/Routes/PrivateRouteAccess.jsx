import React, { useContext, useEffect } from "react";
import { UserContext } from "../src/contexts/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../src/scenes/Dashbord/Sidebar";
import Header from "../src/scenes/Dashbord/Navbar";
import { axiosInstance } from "../src/api";

function PrivateRouteAccess() {
  console.log("Private route");
  // Import the user context
  const user = useContext(UserContext); // { user: { isConnected: false, data: null }, setUser}

  // Config the useNavigate

  const navigate = useNavigate(); // From React-Router-DOM
  const { isConnected } = user.user;

  useEffect(() => {
    console.log(isConnected);

    if (isConnected == false) {
      axiosInstance
        .post("/verify")
        .then((resp) => {
          console.log("Resp", resp);
          const data = resp.data;

          user.setUser({
            isConnected: true,
            data: data.user,
          });

          toast.success(data.message);
          return;
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
          navigate("/");
        });
    }
  }, [isConnected]);

  if (isConnected == true) {
    return (
      <>
        <Header />
        <div
          className="flex"
          style={{ height: "100%", backgroundColor: "#0B4C5F" }}
        >
          <Sidebar />

          <Outlet />
        </div>
      </>
    );
  }
  return "";
}

export default PrivateRouteAccess;
