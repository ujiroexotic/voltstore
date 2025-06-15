"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateOrderPayload, UserOrders } from "../../types/orders"; // ✅ Use UserOrders

export const ordersApiSlice = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    credentials: "include",
  }),
  endpoints: (builder) => {
    return {
      // ✅ Updated return type to match frontend expectation
      getUserOrders: builder.query<UserOrders[], void>({
        query: () => "/orders/my",
      }),
      createOrder: builder.mutation<void, CreateOrderPayload>({
        query: (order) => ({
          url: "/orders",
          method: "POST",
          body: order,
        }),
      }),
    };
  },
});

export const { useGetUserOrdersQuery, useCreateOrderMutation } = ordersApiSlice;
