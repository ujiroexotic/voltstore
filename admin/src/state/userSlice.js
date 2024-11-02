import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  error: null,
  isLoading: true, // Initially true to indicate loading state
};

// Thunk to check if user is logged in
export const checkUserStatus = createAsyncThunk(
  "api/users/checkAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/users/checkAdmin`,
        {
          withCredentials: true, // only needed if cookies are used for auth
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);


// Thunk for user login
export const login = createAsyncThunk(
  "api/users/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/users/login`,
        data,
        {
          withCredentials: true,
        }
      );
      return result.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

// Thunk for user logout
export const logout = createAsyncThunk(
  "api/users/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/users/logout`,
        {
          withCredentials: true,
        }
      );
      return result.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(checkUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
