import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
//   productWithInterval: [],
  error: null,
  isLoading: false,
};

export const getAllProducts = createAsyncThunk(
  "api/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/products`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        add: (state, action) => {
            // Logic to add a product
        },
        remove: (state, action) => {
            // Logic to remove a product
        },
        update: (state, action) => {
            // Logic to update a product
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { add, remove, update } = productSlice.actions;

export default productSlice.reducer;