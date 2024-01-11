import { createSlice } from "@reduxjs/toolkit";

const initialeState = { products: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialeState,
  reducers: {
    fillProducts: (state, { payload }) => {
      state.products = payload;
    },
    addProductToCart: (state, action) => {
      const existingProduct = state.products.find(
        (elm) => elm.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity++; // If the product exists, increase its quantity
      } else {
        state.products.push({ ...action.payload, quantity: 1 }); // If the product doesn't exist, add it to the cart with quantity 1
      }
    },
    decrementProductQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (elm) => elm.id === action.payload.id
      );
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      }
    },
    removeProductFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    dropCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  decrementProductQuantity,
  fillProducts,
  dropCart,
} = cartSlice.actions;

export default cartSlice.reducer;
