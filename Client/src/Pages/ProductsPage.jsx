import React, { useEffect, useMemo, useState } from "react";
import Footer from "../scenes/Dashbord/global/ShopFront/Footer.jsx";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { axiosInstance } from "../api";
import { ProductCard } from "../scenes/Dashbord/global/ShopFront/ImageProducts.jsx";

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

  useEffect(() => {
    axiosInstance
      .get("/v1/categories/category_subcategory/659bf43f1ef65659bf7fc82f")
      .then((resp) => {
        const data = resp.data.data;
        console.log(data);
        setSubProducts(data);
      });
  }, []);

  const currentSubProducts = useMemo(() => {
    return subProducts.filter(
      (subProduct) => subProduct.sub._id === selectedSubcategoryId
    );
  }, [subProducts, selectedSubcategoryId]);

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

      <Stack direction={"row"} sx={{ paddingY: 20 }}>
        {currentSubProducts.length > 0 &&
          currentSubProducts[0].products.map((product) => (
            <ProductCard
              key={product.id}
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
