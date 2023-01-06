import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    removeProduct(state, action) {
      state.products.filter((product) => product.id === action.payload.id);
    },
    removeProducts(state) {
      state.products = [];
    },
  },
});
export const { addProduct, removeProduct, removeProducts } = cartSlice.actions;
export default cartSlice.reducer;
