"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/user"; // Assuming User type is defined in your types folder
import { logout, setCredentials } from "./authSlice";
import Cookies from "js-cookie";

export const userApiSlice = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    credentials: "include",  // Include credentials for all requests
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, Omit<User, "id">>({
      query: (newUser) => ({
        url: "/users/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation<{ userId: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data.userId }));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    getUserProfile: builder.query<User, void>({
      query: () => "/users/profile",
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Handle client-side logout actions, like clearing cookies and Redux store
          Cookies.remove("authToken"); // Assuming the token is stored in cookies
          dispatch(logout()); // Clear user data in Redux store
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserProfileQuery,
  useLogoutUserMutation, // Expose the logout mutation hook
} = userApiSlice;
