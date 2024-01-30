import React, { useContext, useEffect, useState } from "react";
import UpBar from "../scenes/Dashbord/global/ShopFront/UpBar";
import Footer from "../scenes/Dashbord/global/ShopFront/Footer";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { axiosInstance } from "../api";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CartContext } from "../contexts/CartContext";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../features/cart/cartSlice";

const accordionStyle = {
  backgroundColor: "transparent",
  boxShadow: "none",
  border: ".7px solid rgba(0, 0, 0, .2)",
  borderRadius: 0,
};

function SinglePage() {
  const params = useParams();
  const Productpath = `/v1/products/${params.slug}`;
  console.log(params.slug);

  const [product, setProduct] = useState();

  const { openCart, setOpenCart } = useContext(CartContext);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance.get(Productpath).then((resp) => {
      const data = resp.data.data;
      console.log(data);
      console.log(data.sku);
      setProduct(data);
    });
  }, []);

  const handleAddProduct = (name, price, imgUrl, id) => {
    dispatch(addProductToCart({ name, price, imgUrl, id }));
    setOpenCart(true);
  };

  return (
    <Box style={{ backgroundColor: "rgba(242, 242, 242, 0.95)" }}>
      <UpBar />

      {!product ? (
        "loading..."
      ) : (
        <>
          <Container sx={{ paddingY: 20 }} maxWidth={"lg"}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Grid container>
                  <Grid
                    item
                    xs={2}
                    maxHeight={300}
                    container
                    justifyContent={"flex-start"}
                    gap={2}
                  ></Grid>
                  <Grid item xs={10}>
                    <img style={{ width: "80%" }} src={product.product_image} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h4"
                  style={{ fontFamily: "Archivo", color: "black" }}
                >
                  {product.product_name}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ marginTop: 10, color: "black" }}
                >
                  {product.price}
                </Typography>
                <Typography variant="caption" style={{ marginTop: 10 }}>
                  Tax included
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  style={{
                    color: "black",
                    borderColor: "black",
                    border: "2px solid black",
                    marginTop: 25,
                  }}
                  onClick={() =>
                    handleAddProduct(
                      product.product_name,
                      product.price,
                      product.product_image,
                      product._id
                    )
                  }
                >
                  ADD TO CART
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  style={{
                    color: "white",
                    borderColor: "black",
                    backgroundColor: "black",
                    border: "2px solid black",
                    marginTop: 10,
                  }}
                  onClick={() =>
                    handleAddProduct(
                      product.product_name,
                      product.price,
                      product.product_image,
                      product._id
                    )
                  }
                >
                  BUY IT NOW
                </Button>
                <Typography variant="body1" style={{ marginTop: 25 }}>
                  {product.long_description}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ marginY: 10 }}>
              <Accordion sx={accordionStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>PAYMENT</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Pay by card on the site or in cash on delivery
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={accordionStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>DELIVERY</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Free delivery throughout Morocco in 2 days
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={accordionStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>EXCHANGES AND REFUNDS</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Free exchanges and returns for 7 days</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Container>
          <div className=" w-full" style={{ backgroundColor: "#F2F2F2F2" }}>
            <Footer />
          </div>
        </>
      )}
    </Box>
  );
}

export default SinglePage;
