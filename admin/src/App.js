import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Appointments from "./components/appointments/Appointments";
import Doctors from "./components/doctors/Doctors";
import Transactions from "./components/transactions/Transactions";
import Admins from "./components/management/Admins";
import Login from "./components/login/Login";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import UnAvailableDates from "./components/UnavalableDates/UnavalableDates";
import Departments from "./components/departments/Departments";
import {
  DashboardContainer,
  Dashboard,
} from "./components/dashboard/Dashboard";
import "./global.css";
import { useNavigationType, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUserStatus } from "./state/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Customers from "./components/customers/Customers";
import Products from "./components/products/Products";
import Orders from "./components/orders/Orders";
import Category from "./components/category/Category";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    dispatch(checkUserStatus());
  }, []);
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);
  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
      case "/dashboard":
        title = "Dashboard | VoltStore";
        metaDescription = "Welcome to the dashboard of VoltStore.";
        break;
      case "/appointments":
        title = "Appointments | VoltStore";
        metaDescription = "Manage your appointments in VoltStore.";
        break;
      case "/cutomers":
        title = "Customers | VoltStore";
        metaDescription = "Manage Customers in VoltStore.";
        break;
      case "/transactions":
        title = "Transactions | VoltStore";
        metaDescription = "View and manage transactions in VoltStore.";
        break;
      case "/unavailabledates":
        title = "Unavailable Dates | VoltStore";
        metaDescription = "Manage unavailable dates in VoltStore.";
        break;
      case "/admins":
        title = "Admins | VoltStore";
        metaDescription = "Manage admin users in VoltStore.";
        break;
      case "/departments":
        title = "Departments | VoltStore";
        metaDescription = "Manage departments in VoltStore.";
        break;
      case "/login":
        title = "Login | VoltStore";
        metaDescription = "Login to your VoltStore account.";
        break;
      case "/signup":
        title = "Signup | VoltStore";
        metaDescription = "Create a new VoltStore account.";
        break;
      default:
        title = "VoltStore";
        metaDescription =
          "Welcome to VoltStore, your hospital management solution.";
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardContainer />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="customers" element={<Customers />} />
            <Route path="categories" element={<Category />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="unavailabledates" element={<UnAvailableDates />} />
            <Route path="admins" element={<Admins />} />
            <Route path="departments" element={<Departments />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
