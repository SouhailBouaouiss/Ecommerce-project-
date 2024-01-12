import React, { useEffect, useMemo, useState } from "react";
import Footer from "../scenes/Dashbord/global/ShopFront/Footer.jsx";
import {
  Box,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { axiosInstance } from "../api";
import { ProductCard } from "../scenes/Dashbord/global/ShopFront/ImageProducts.jsx";
import { useParams } from "react-router-dom";

function ProductsPage() {
  const [subProducts, setSubProducts] = useState([]);

  const [selectedSubcategory, setSelectedSubcategory] = useState(
    subProducts.length > 0 ? subProducts[0].sub.subcategory_name : ""
  );
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(
    subProducts.length > 0 ? subProducts[0].sub._id : ""
  );
  const handleChange = (value, id) => {
    setSelectedSubcategory(value);
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
        setSelectedSubcategory(data[0].sub.subcategory_name);
      });
  }, []);

  const currentSubProducts = useMemo(() => {
    return subProducts.filter(
      (subProduct) => subProduct.sub.subcategory_name === selectedSubcategory
    );
  }, [subProducts, selectedSubcategory]);

  return (
    <Box style={{ backgroundColor: "rgba(242, 242, 242, 0.95)" }}>
      <ToggleButtonGroup
        color="primary"
        value={selectedSubcategory}
        key={selectedSubcategoryId}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ position: "absolute", top: "100px", left: "79vh" }}
      >
        {subProducts.length > 0 && (
          <>
            {subProducts.map((subProduct) => (
              <ToggleButton
                key={subProduct.sub._id}
                value={subProduct.sub.subcategory_name}
                onChange={() =>
                  handleChange(
                    subProduct.sub.subcategory_name,
                    subProduct.sub._id
                  )
                }
                selected={
                  selectedSubcategory === subProduct.sub.subcategory_name
                }
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
        {currentSubProducts.length > 0 &&
          currentSubProducts[0].products.map((product) => (
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
  );
}

export default ProductsPage;
