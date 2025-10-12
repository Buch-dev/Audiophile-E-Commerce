import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch products by category from the backend
export const getProductsByCategories = createAsyncThunk(
  "products/getProductsByCategories",
  async (category, { rejectWithValue }) => {
    try {
      const link = `/api/v1/products/category/${category}`;
      const { data } = await axios.get(link);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categoryProducts",
  initialState: {
    products: [], // Changed from 'categories' to 'products'
    productCount: 0, // Added product count
    loading: false,
    error: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    clearCategoryProducts: (state) => {
      state.products = [];
      state.productCount = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategories.fulfilled, (state, action) => {
        console.log(`Fulfilled action payload:`, action.payload);
        state.loading = false;
        state.error = null;
        // Store products from your API response
        state.products = action.payload.products || [];
        state.productCount = action.payload.count || 0;
      })
      .addCase(getProductsByCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
        state.products = [];
        state.productCount = 0;
      });
  },
});

export const { removeErrors, clearCategoryProducts } = categorySlice.actions;
export default categorySlice.reducer;
