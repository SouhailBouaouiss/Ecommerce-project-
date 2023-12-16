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
  const user = useContext(UserContext);

  // Config the useNavigate

  const navigate = useNavigate();
  const { isConnected } = user.user;

  useEffect(() => {
    console.log(isConnected);

    if (isConnected == false) {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      axiosInstance
        .post("/verify", { refresh_token })
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
        <div className="flex" style={{ height: "100%" }}>
          <Sidebar />
          <div className="w-full mt-10 ms-10">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
}

export default PrivateRouteAccess;
