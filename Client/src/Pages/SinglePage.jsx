import React, { useEffect, useState } from "react";
import UpBar from "../scenes/Dashbord/global/ShopFront/UpBar";
import Footer from "../scenes/Dashbord/global/ShopFront/Footer";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { axiosInstance } from "../api";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const accordionStyle = {
  backgroundColor: "transparent",
  boxShadow: "none",
  border: ".7px solid rgba(0, 0, 0, .2)",
  borderRadius: 0,
};

function SinglePage() {
  const params = useParams();
  const Productpath = `/v1/products/${params.slug}`;

  const [product, setProduct] = useState();

  useEffect(() => {
    axiosInstance.get(Productpath).then((resp) => {
      const data = resp.data.data;
      console.log(data);
      console.log(data.sku);
      setProduct(data);
    });
  }, []);

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
                  >
                    <Grid item xs={12}>
                      <img
                        style={{ height: "80px" }}
                        src="//lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298503936.jpg?v=1702638087&width=200 200w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298503936.jpg?v=1702638087&width=400 400w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298503936.jpg?v=1702638087&width=600 600w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298503936.jpg?v=1702638087&width=700 700w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298503936.jpg?v=1702638087&width=800 800w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298503936.jpg?v=1702638087&width=900 900w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298503936.jpg?v=1702638087&width=1000 1000w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298503936.jpg?v=1702638087&width=1080 1080w"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <img
                        style={{ height: "80px" }}
                        src="//lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298602240.jpg?v=1702638100&width=200 200w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298602240.jpg?v=1702638100&width=400 400w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298602240.jpg?v=1702638100&width=600 600w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298602240.jpg?v=1702638100&width=700 700w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298602240.jpg?v=1702638100&width=800 800w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298602240.jpg?v=1702638100&width=900 900w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298602240.jpg?v=1702638100&width=1000 1000w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298602240.jpg?v=1702638100&width=1080 1080w"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <img
                        style={{ height: "80px" }}
                        src="//lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=200 200w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=400 400w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=600 600w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=700 700w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=800 800w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=900 900w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=1000 1000w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=1080 1080w"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <img
                        style={{ height: "80px" }}
                        src="//lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=200 200w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=400 400w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=600 600w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=700 700w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=800 800w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=900 900w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=1000 1000w, //lnkobrand.com/cdn/shop/files/everton-lunettes-de-vue-et-lunettes-de-soleil-au-39717298340096.jpg?v=1702638093&width=1080 1080w"
                      />
                    </Grid>
                  </Grid>
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
