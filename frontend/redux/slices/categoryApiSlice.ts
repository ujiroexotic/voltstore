"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../../types/catgories"; // Import your Category type

export const categoriesApiSlice = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/category",
    }),
    addCategory: builder.mutation<Category, Omit<Category, "id">>({
      query: (newCategory) => ({
        url: "/category",
        method: "POST",
        body: newCategory,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoriesApiSlice;
