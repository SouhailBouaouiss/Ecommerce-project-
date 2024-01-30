import React, { useContext, useEffect } from "react";
import BackgroundVideo from "../scenes/Dashbord/global/ShopFront/BackgroundVideo";
import ImageCollection from "../scenes/Dashbord/global/ShopFront/ImageCollections";
import ImageProducts from "../scenes/Dashbord/global/ShopFront/ImageProducts";
import ImageSignup from "../scenes/Dashbord/global/ShopFront/ImageSignup";
import PartnersSection from "../scenes/Dashbord/global/ShopFront/PartenersSection";
import Footer from "../scenes/Dashbord/global/ShopFront/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../api";
import { UserContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { dropCart } from "../features/cart/cartSlice";

function LandingPage() {
  const { user } = useContext(UserContext);
  let [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);

    const orderData = searchParams.get("order_data");

    if (orderData) {
      console.log(orderData);
      try {
        const productsFromQuery = JSON.parse(orderData);

        if (!productsFromQuery || !Array.isArray(productsFromQuery)) {
          toast.error("Something went wrong");
          return;
        }

        axiosInstance
          .post("/v1/orders", {
            order_items: productsFromQuery,
          })
          .then((resp) => {
            const data = resp.data;
            toast.success(data.message);
            dispatch(dropCart());
            localStorage.removeItem("productsCart");
            navigate("/landingpage");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);

        toast.error("Could'nt make order");
      }
    }
  }, []);

  return (
    <>
      <BackgroundVideo />
      <div className="mt-20 w-full">
        <ImageCollection />
      </div>
      <div className="mt-20 w-full">
        <ImageProducts />
      </div>
      <div className=" w-full" style={{ backgroundColor: "#F2F2F2F2" }}>
        <PartnersSection />
      </div>
      <div className=" w-full">
        <ImageSignup />
      </div>

      <div className=" w-full" style={{ backgroundColor: "#F2F2F2F2" }}>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
