import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { FaMoneyCheckAlt, FaPowerOff } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../state/userSlice";
import { VscListUnordered } from "react-icons/vsc";
import { MdProductionQuantityLimits } from "react-icons/md";
const MainListItems = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => goTo("/")}>
        <ListItemIcon>
          <DashboardIcon sx={{ fontSize: "22px" }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/categories")}>
        <ListItemIcon>
          <MdCategory style={{ fontSize: "20px" }} />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/products")}>
        <ListItemIcon>
          <MdProductionQuantityLimits style={{ fontSize: "20px" }} />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/orders")}>
        <ListItemIcon>
          <VscListUnordered style={{ fontSize: "20px" }} />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/customers")}>
        <ListItemIcon>
          <FaUserDoctor style={{ fontSize: "20px" }} />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/transactions")}>
        <ListItemIcon>
          <FaMoneyCheckAlt style={{ fontSize: "20px" }} />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const mainListItems = <MainListItems />;

export const SecondaryListItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };
  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Successfully LoggedOut!");
    navigate("/login");
  };

  return (
    <React.Fragment>
      <ListSubheader
        component="div"
        inset
        sx={{ backgroundColor: "#159eec", color: "#fff", marginTop: "85px" }}
      >
        Admin
      </ListSubheader>
      {/* <ListItemButton sx={{height: "40px"}} onClick={() => goTo("/admins")}>
         <ListItemIcon>
          <MdManageAccounts style={{ fontSize: "25px" }} />
        </ListItemIcon>
        <ListItemText primary="Admins" /> 
      </ListItemButton> */}
      {/* <ListItemButton onClick={() => goTo("/profile")}>
        <ListItemIcon>
          <CgProfile style={{ fontSize: "25px" }} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton> */}
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <FaPowerOff />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
};
export const secondaryListItems = <SecondaryListItems />;
