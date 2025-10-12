import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import categoryReducer from "../features/products/categorySlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    categoryProducts: categoryReducer,
  },
});
