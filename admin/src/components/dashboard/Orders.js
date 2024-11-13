import * as React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../state/orderSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((store) => store.orders);
  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  React.useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        {orders ? (
          <>
            <TableHead>
              <TableRow>
                <TableCell>UserID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice(0, 5).map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
                    {order.shippingAddress.country}
                  </TableCell>
                  <TableCell align="right">
                    {f.format(new Date(order.createdAt))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        ) : (
          <Typography color="textSecondary">Loading...</Typography>
        )}
      </Table>
      <Link to="/orders" style={{ color: "#159EEC" }}>
        See all Orders
      </Link>
    </React.Fragment>
  );
}
