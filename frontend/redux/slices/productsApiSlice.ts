"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types/products";

export const productsApiSlice = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  }),
  endpoints: (builder) => {
    return {
      getProducts: builder.query<Product[], void>({
        query: () => "/products",
      }),
      addProdut: builder.mutation<Product, Omit<Product, "id">>({
        query: (post) => ({
          url: "/products",
          method: "POST",
          body: post,
        }),
      }),
    };
  },
});

export const { useGetProductsQuery, useAddProdutMutation } = productsApiSlice;
