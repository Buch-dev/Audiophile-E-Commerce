import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (_, { rejectWithValue }) => {
    try {
      const link = `/api/v1/products`;
      const data = await axios.get(link).then((res) => res.data);
      console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// get single product details
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const link = `/api/v1/products/${id}`;
      const data = await axios.get(link).then((res) => res.data);
      console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occured");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productCount: 0,
    productDetails: null,
    loading: false,
    detailsLoading: false,
    error: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        console.log(`Fulfilled action payload:`, action.payload);
        state.loading = false;
        state.error = null;
        state.products = action.payload.products || [];
        state.productCount = action.payload.productCount || 0;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })
      // Get productDetails cases
      .addCase(getProductDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.error = false;
        state.productDetails = action.payload.product || action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload || "Failed to fetch product details";
      });
  },
});

export const { removeErrors, clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
