import React, { useEffect, useState } from "react";
// import UpBar from "../src/scenes/Dashbord/global/UpBar";
import { Outlet } from "react-router-dom";
import ShoppingCart from "../src/scenes/Dashbord/global/ShopFront/ShoppingCart";
import SharedComponent from "../src/components/SharedComponent";
import { CartContext } from "../src/contexts/CartContext";
import { fillProducts } from "../src/features/cart/cartSlice";
import { useDispatch } from "react-redux";

function CustomerPublicRoutes() {
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const localProducts = localStorage.getItem("productsCart");
    if (localProducts) {
      const parsed = JSON.parse(localProducts);
      dispatch(fillProducts(parsed));
    }
  }, []);

  return (
    <>
      <CartContext.Provider value={{ openCart, setOpenCart }}>
        <SharedComponent />
        <Outlet />
      </CartContext.Provider>
    </>
  );
}

export default CustomerPublicRoutes;
