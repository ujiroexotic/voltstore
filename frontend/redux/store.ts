"use client";
import { configureStore } from "@reduxjs/toolkit";
import { productsApiSlice } from "./slices/productsApiSlice";
import { userApiSlice } from "./slices/userApiSlice"; // Import usersApiSlice

export const store = configureStore({
  reducer: {
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer, // Add usersApiSlice reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(productsApiSlice.middleware)
      .concat(userApiSlice.middleware); // Add usersApiSlice middleware
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
