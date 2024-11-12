"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateOrderPayload, Order } from "../../types/orders"; // Make sure to define the Order type in your types folder

export const ordersApiSlice = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    credentials: "include", // Ensure credentials (cookies) are included in requests
  }),
  endpoints: (builder) => {
    return {
      getUserOrders: builder.query<Order[], void>({
        query: () => "/orders/my", // Make GET request to the user's orders
      }),
      createOrder: builder.mutation<void, CreateOrderPayload>({
        query: (order) => ({
          url: '/orders',
          method: 'POST',
          body: order,
        }),
      }),
    };
  },
});

export const { useGetUserOrdersQuery, useCreateOrderMutation } = ordersApiSlice;
