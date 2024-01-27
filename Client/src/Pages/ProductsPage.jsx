import React, { useEffect, useMemo, useState } from "react";
import Footer from "../scenes/Dashbord/global/ShopFront/Footer.jsx";
import {
  Box,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { axiosInstance } from "../api";
import { ProductCard } from "../scenes/Dashbord/global/ShopFront/ImageProducts.jsx";
import { useParams } from "react-router-dom";

function ProductsPage() {
  const [subProducts, setSubProducts] = useState([]);

  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
  const handleChange = (id) => {
    setSelectedSubcategoryId(id);
  };
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axiosInstance
      .get(`/v1/categories/category_subcategory/${id}`)
      .then((resp) => {
        const data = resp.data.data;
        console.log(data);
        setSubProducts(data);
        setSelectedSubcategoryId(data[0].sub._id);
      });
  }, []);

  // IT should return an array of products or an empty array !! AN ARRAY ANYWAY

  const currentSubProducts = useMemo(() => {
    const currentSubcategory = subProducts.find(
      (subProduct) => subProduct.sub._id === selectedSubcategoryId
    );
    console.log(currentSubcategory);
    if (!currentSubcategory) {
      return [];
    }
    const products = currentSubcategory.products;
    if (!products) {
      return [];
    }
    return products;
  }, [subProducts, selectedSubcategoryId]);
  const currentUrl = window.location.href;

  const urlParams = new URLSearchParams(new URL(currentUrl).search);
  const categoryName = urlParams.get("category_name");
  console.log(categoryName);

  return (
    <>
      <Box
        style={{ backgroundColor: "rgba(242, 242, 242, 0.95)", width: "100%" }}
      >
        <ToggleButtonGroup
          color="primary"
          value={selectedSubcategoryId} //SOLAR protection
          key={selectedSubcategoryId}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={{
            position: "absolute",
            top: "100px",
            left: "79vh",
          }}
        >
          {subProducts.length > 0 && (
            <>
              {subProducts.map((subProduct) => (
                <ToggleButton
                  key={subProduct.sub._id}
                  value={subProduct.sub.subcategory_name}
                  onChange={() => handleChange(subProduct.sub._id)}
                  selected={selectedSubcategoryId === subProduct.sub._id}
                  style={{ width: "100px", height: "40px" }}
                >
                  {subProduct.sub.subcategory_name}
                </ToggleButton>
              ))}
            </>
          )}
        </ToggleButtonGroup>

        <Grid
          display={"flex"}
          sx={{ paddingY: 20 }}
          justifyContent={"center"}
          gap={"20px"}
          flexWrap={"wrap"}
          width={"100%"}
        >
          <Grid
            container
            display={"flex"}
            justifyContent={"start"}
            marginLeft={"50px"}
          >
            <h6
              style={{
                textAlign: "center",
                fontSize: "2rem",
                marginBottom: "8px",
                color: "black",
                fontFamily: "Gruppo', sans-serif",
                fontWeight: "1rem",
              }}
            >
              {categoryName}'S COLLECTION
            </h6>
          </Grid>

          {currentSubProducts.length > 0 &&
            currentSubProducts.map((product) => (
              <ProductCard
                key={product._id}
                name={product.product_name}
                price={product.price}
                id={product._id}
                initialImage={product.product_image}
                hoverImage={product.product_image}
              />
            ))}
        </Grid>
        <div className=" w-full" style={{ backgroundColor: "#F2F2F2F2" }}>
          <Footer />
        </div>
      </Box>
    </>
  );
}

export default ProductsPage;
