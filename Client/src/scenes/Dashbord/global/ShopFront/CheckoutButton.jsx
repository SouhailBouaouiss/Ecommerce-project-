import { Button } from "@mui/material";
import React from "react";
import { axiosInstance } from "../../../../api";

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
  const handleCheckout = () => {
    axiosInstance
      .post("/v1/stripe/create-checkout-session", {
        cartProducts,
      })
      .then((resp) => {
        if (resp.data.url) {
          window.location.href = resp.data.url;
        }
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
