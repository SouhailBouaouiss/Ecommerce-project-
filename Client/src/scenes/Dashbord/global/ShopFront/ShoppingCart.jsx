import { Box, Grid, Modal, Button, IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";

import React, { useContext } from "react";
import CartProducts from "../CartProducts/CartProducts";
import { CartContext } from "../../../../contexts/CartContext";

function ShoppingCart() {
  const style = {
    position: "fixed",
    top: "0%",
    right: "0%",
    width: 340,
    height: "100vh",
    overflowY: "auto",
    bgcolor: "background.paper",
  };
  const headingStyle = {
    fontSize: "20px",
    marginBottom: "8px",
    color: "black",
    // fontFamily: "Archivo', sans-serif",
    fontFamily: "Zurich Extended, sans-serif",
    textTransform: "uppercase",
    fontWeight: 700,
    textAlign: "center",
    letterSpacing: "0.25em",
  };

  const { openCart, setOpenCart } = useContext(CartContext);

  return (
    <Modal
      open={openCart}
      onClose={() => setOpenCart(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container justifyContent={"center"} flexDirection={"column"}>
          <Grid item padding={2}>
            <h2 style={headingStyle}>Your Cart</h2>
          </Grid>
          <Grid item width={"100%"}>
            <Divider />
          </Grid>

          <CartProducts />
        </Grid>
      </Box>
    </Modal>
  );
}

export default ShoppingCart;
