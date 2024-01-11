import { Button } from "@mui/material";
import React, { useContext } from "react";
import { axiosInstance } from "../../../../api";
import { UserContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CheckoutButton({ cartProducts }) {
  const btnstyle = {
    // width: "400px",
    height: "50px",
    backgroundColor: "black",
    fontSize: "1rem",
    color: "white",
    marginTop: "18px",
    fontFamily: "Zurich Extended, sans-serif",
    fontWeight: 400,
    letterSpacing: "0.25em",
  };
  const navigate = useNavigate();
  const customer = useContext(UserContext);
  const handleCheckout = () => {
    const { isConnected } = customer.user;
    if (!isConnected) {
      axiosInstance
        .post("/verify")
        .then((resp) => {
          console.log("Resp", resp);
          const data = resp.data;

          customer.setUser({
            isConnected: true,
            data: data.user,
          });

          toast.success(data.message);
          return;
        })
        .catch((error) => {
          console.log(error);

          navigate("/authentication");
        });
    }
    const customer_id = customer.user.data._id;
    axiosInstance
      .post("/v1/stripe/create-checkout-session", {
        cartProducts,
        customer_id,
      })
      .then((resp) => {
        if (resp.data.url.endsWith("ld")) {
          window.location.href = resp.data.url;
          const productsIds = cartProducts.map((product) => {
            return product.id;
          });
          axiosInstance("/v1/orders", {
            customer_id,
            order_items: productsIds,
          })
            .then((resp) => {
              const data = resp.data;
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        window.location.href = resp.data.url;
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <Button fullWidth style={btnstyle} onClick={handleCheckout}>
      CKECKOUT
    </Button>
  );
}

export default CheckoutButton;
