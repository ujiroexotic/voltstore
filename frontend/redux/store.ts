"use client";
import { configureStore } from "@reduxjs/toolkit";
import { productsApiSlice } from "./slices/productsApiSlice";

export const store = configureStore({
  reducer: {
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;