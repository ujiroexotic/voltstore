// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./appointmentSlice";
import dialogReducer from "./dialogSlice";
import userReducer from "./userSlice";
import transactionReducer from "./transactionSlice";
import doctorReducer from "./doctorSlice";
import unAvailableDatesReducer from "./unAvailableDatesSlice";
import DepartmentReducer from "./departmentSlice";
import produtReducer from "./productSlice";
import categoryReducer from "./categorySlice";
export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    dialog: dialogReducer,
    user: userReducer,
    transactions: transactionReducer,
    doctors: doctorReducer,
    unAvailableDates: unAvailableDatesReducer,
    departments: DepartmentReducer,
    products: produtReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
