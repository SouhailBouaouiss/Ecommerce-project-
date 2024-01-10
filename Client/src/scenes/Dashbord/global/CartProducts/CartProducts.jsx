import React, { useContext, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductToCart,
  decrementProductQuantity,
  fillProducts,
  removeProductFromCart,
} from "../../../../features/cart/cartSlice";
import { Box, Button, Divider, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartContext } from "../../../../contexts/CartContext";
import CheckoutButton from "../ShopFront/CheckoutButton";

function CartProducts() {
  const products = useSelector((state) => state.cart.products);
  console.log(products);
  const dispatch = useDispatch();

  const { openCart, setOpenCart } = useContext(CartContext);

  // Save the shoppingCart in the localStorage

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("productsCart", JSON.stringify(products));
    } else {
      localStorage.removeItem("productsCart");
    }
  }, [products]);

  const Total = useMemo(() => {
    return products
      .map((obj) => obj.price * obj.quantity)
      .reduce((acc, price) => acc + price, 0)
      .toFixed(2);
  }, [products]);

  const incrementQuantity = (id) => {
    dispatch(addProductToCart({ id }));
  };
  const decrementQuantity = (id) => {
    dispatch(decrementProductQuantity({ id }));
  };

  if (products.length == 0 && !localStorage.getItem("productsCart")) {
    return <p>Your cart is currently empty.</p>;
  }
  return (
    <>
      <Grid container>
        {products.map((product) => (
          <Grid item xs={12} padding={2}>
            <Grid container columns={2} gap={2} wrap="no-wrap" key={product.id}>
              <img src={product.imgUrl} alt="" style={{ height: "110px" }} />

              <Box>
                <h2
                  style={{
                    fontSize: "16px",
                    color: "black",
                    fontFamily: "Zurich Extended, sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {product.name}
                </h2>
                <span
                  style={{
                    fontSize: "14px",
                    color: "black",
                    marginTop: "10px",
                    fontFamily: "Zurich Extended, sans-serif",
                  }}
                >
                  {(product.price * product.quantity).toFixed(2)} DH
                </span>
                <Grid
                  container
                  justifyContent={"start"}
                  alignItems={"center"}
                  gap={"8px"}
                  marginTop={"20px"}
                  color={"black"}
                  columns={2}
                >
                  <Grid item>
                    <IconButton
                      color="black"
                      size="small"
                      onClick={() => incrementQuantity(product.id)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <h3
                      // className="mt-4"
                      style={{
                        color: "black",
                        padding: "5px ",
                        fontSize: "12px",
                      }}
                    >
                      {product.quantity}
                    </h3>
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="black"
                      size="small"
                      onClick={() => decrementQuantity(product.id)}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        color: "black",
                        fontSize: "12px",
                        textDecoration: "underline",
                        fontFamily: "Zurich Extended, sans-serif",
                        fontWeight: 400,
                      }}
                      onClick={() =>
                        dispatch(removeProductFromCart(product.id))
                      }
                    >
                      DELETE
                    </Button>
                  </Grid>
                </Grid>
                <Grid item marginTop={"30px"}></Grid>
              </Box>
            </Grid>
            <Divider />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        position={"sticky"}
        bottom={0}
        left={0}
        bgcolor={"white"}
        padding={4}
      >
        <h2
          style={{
            fontSize: "20px",
            color: "black",

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
        <CheckoutButton cartProducts={products} />
        <Button
          style={{
            color: "black",
            fontSize: "12px",
            textDecoration: "underline",
            fontFamily: "Zurich Extended, sans-serif",
            fontWeight: 400,
            marginTop: 20,
          }}
          onClick={() => setOpenCart(false)}
        >
          Continue Shopping
        </Button>
      </Grid>
    </>
  );
}

export default CartProducts;
