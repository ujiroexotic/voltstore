// src/state/ordersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  error: null,
  isLoading: false,
};

// Fetch all orders
export const getAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/orders`,
        {
          withCredentials: true,
        }
      );
      console.log("Order response: ", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

// Add a new order
export const addOrder = createAsyncThunk(
  "orders/addNew",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/orders`,
        data,
        {
          withCredentials: true, // only needed if cookies are used for auth
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

// Update an existing order status
export const updateOrder = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    console.log("id", id);
    console.log("status", status);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/orders/${id}`,
        { status },
        {
          withCredentials: true, // only needed if cookies are used for auth
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/orders/${id}`,
        {
          withCredentials: true, // only needed if cookies are used for auth
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An error occurred"
      );
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload._id
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
