import React, { useMemo, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Link,
} from "@mui/material";
import CartProducts from "../scenes/Dashbord/global/CartProducts/CartProducts";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";

const PaymentPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleToggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  const products = useSelector((state) => state.cart.products);
  const Total = useMemo(() => {
    return products
      .map((obj) => obj.price * obj.quantity)
      .reduce((acc, price) => acc + price, 0)
      .toFixed(2);
  }, [products]);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Grid container spacing={25} wid>
        {/* Signup/Login Section */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            style={{
              fontSize: "23px",
              color: "black",
              fontFamily: "Zurich Extended, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.25em",
            }}
          >
            {"Delivery Information"}
          </Typography>
          <form>
            <Grid container spacing={2} marginTop={3}>
              <>
                <Grid item xs={6}>
                  <TextField fullWidth label="First Name" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Last Name" variant="outlined" />
                </Grid>
              </>

              <Grid item xs={12} marginTop={2}>
                <TextField fullWidth label="Email" variant="outlined" />
              </Grid>

              {/* Add Postal Code Input */}
              <Grid item xs={6} marginTop={2}>
                <TextField fullWidth label="Postal Code" variant="outlined" />
              </Grid>

              {/* Add City Input */}
              <Grid item xs={6} marginTop={2}>
                <TextField fullWidth label="City" variant="outlined" />
              </Grid>

              {/* Add Phone Number Input */}
              <Grid item xs={12} marginTop={2}>
                <TextField fullWidth label="Phone Number" variant="outlined" />
              </Grid>

              {/* Continue button */}
              <Grid item xs={12} marginTop={2}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "black", color: "white" }}
                  fullWidth
                >
                  {"Continue"}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Typography variant="body2" marginTop={2}>
            {showLoginForm
              ? "Don't have an account? "
              : "Already have an account? "}
            <Link href="#" onClick={handleToggleForm}>
              {showLoginForm ? "Sign up here" : "Login here"}
            </Link>
          </Typography>
        </Grid>

        {/* Shopping Cart Section */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            style={{
              fontSize: "23px",
              color: "black",
              fontFamily: "Zurich Extended, sans-serif",
              fontWeight: 400,
              letterSpacing: "0.25em",
            }}
          >
            Shopping Cart
          </Typography>
          {products.map(({ imgUrl, name, price, quantity }) => (
            <Grid container columns={3} gap={10} wrap="no-wrap" marginTop={4}>
              <div style={{ position: "relative" }}>
                <img
                  src={imgUrl}
                  alt=""
                  width={60} // Corrected width prop
                  height={"auto"}
                  style={{ borderRadius: "5px" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: -3,
                    backgroundColor: "gray",
                    color: "white",
                    padding: "5px",
                    borderRadius: "50%",
                    fontSize: "13px",
                    fontFamily: "Zurich Extended, sans-serif",
                    width: "20px", // Set width and height to the same value
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: "80%",
                  }}
                >
                  {quantity}
                </div>
              </div>
              <span>{name}</span>
              <span>{(price * quantity).toFixed(2)} MAD</span>
            </Grid>
          ))}
          <Grid container columns={2} gap={10} wrap="no-wrap" marginTop={3}>
            <h2
              style={{
                fontSize: "20px",
                color: "black",
                marginTop: "10px",
                textAlign: "center",
                fontFamily: "Zurich Extended, sans-serif",
                fontWeight: 400,
                letterSpacing: "0.25em",
              }}
            >
              TOTAL
            </h2>
            <span
              style={{
                fontSize: "1.5rem",
                color: "black",
                marginTop: "10px",
                textAlign: "center",
                fontFamily: "Zurich Extended, sans-serif",
              }}
            >
              {Total} DH
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage;
