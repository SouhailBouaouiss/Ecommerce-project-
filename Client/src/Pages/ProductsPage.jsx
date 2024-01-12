import React, { useEffect, useMemo, useState } from "react";
import Footer from "../scenes/Dashbord/global/ShopFront/Footer.jsx";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { axiosInstance } from "../api";
import { ProductCard } from "../scenes/Dashbord/global/ShopFront/ImageProducts.jsx";

function ProductsPage() {
  const [subProducts, setSubProducts] = useState([]);

  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
  const handleChange = (id) => {
    setSelectedSubcategoryId(id);
  };

  useEffect(() => {
    axiosInstance
      .get(`/v1/categories/category_subcategory/${categoryId}`)
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

  return (
    <Box style={{ backgroundColor: "rgba(242, 242, 242, 0.95)" }}>
      <ToggleButtonGroup
        color="primary"
        value={selectedSubcategoryId} //SOLAR protection
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
                onChange={() => handleChange(subProduct.sub._id)}
                selected={selectedSubcategoryId === subProduct.sub._id}
              >
                {subProduct.sub.subcategory_name}
              </ToggleButton>
            ))}
          </>
        )}
      </ToggleButtonGroup>

      <Stack direction={"row"} sx={{ paddingY: 20 }}>
        {currentSubProducts.length > 0 && // Handle the worst case ([])
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
      </Stack>
      <div className=" w-full" style={{ backgroundColor: "#F2F2F2F2" }}>
        <Footer />
      </div>
    </Box>
  );
}

export default ProductsPage;
