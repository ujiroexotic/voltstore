import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { Box, Button, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrder } from "../../state/orderSlice";

const OrdersDataTable = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((store) => store.orders);
  console.log(orders)
  const data = useMemo(() => orders, [orders]);
  console.log("orders", orders);
  // State for dialog control
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "user",
        header: "User ID",
      },
      {
        accessorKey: "status",
        filterVariant: "autocomplete", // Use this if not using filter modes feature
        header: "Status",
        size: 200,
        // Custom conditional format and styling
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={{
              backgroundColor:
                cell.getValue() === "cancelled"
                  ? "#FF4500" // Orange Red for Cancelled
                  : cell.getValue() === "processing"
                  ? "#FFA500" // Orange for Processing
                  : cell.getValue() === "shipped"
                  ? "#00CED1" // Dark Turquoise for Shipped
                  : cell.getValue() === "delivered"
                  ? "#32CD32" // Lime Green for Delivered
                  : cell.getValue() === "pending"
                  ? "#FFD700" // Gold for Pending
                  : "#D3D3D3", // Light Gray for any other cases
              borderRadius: "0.5rem",
              color: "#000", // Black text color for better readability
              maxWidth: "12ch",
              padding: "0.25rem",
            }}
          >
            {cell.getValue()?.toLocaleString()}
          </Box>
        ),
      },
      {
        accessorKey: "total",
        header: "Total ($)",
        Cell: ({ cell }) => `$${cell.getValue().toFixed(2)}`,
      },
      {
        accessorFn: (row) =>
          `${row.shippingAddress?.street}, ${row.shippingAddress?.city}`,
        id: "shippingAddress",
        header: "Shipping Address",
      },
      {
        accessorKey: "createdAt",
        header: "Order Date",
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    enableRowSelection: true,
    state: { isLoading },
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30, 50, 100],
      shape: "rounded",
      variant: "outlined",
    },
    muiCircularProgressProps: {
      color: "primary",
      thickness: 5,
      size: 55,
    },
    muiSkeletonProps: {
      animation: "pulse",
      height: 28,
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key="pending"
        onClick={() => {
          closeMenu();
          setCurrentRow(row.original);
          setOpenDialog(true);
          console.log(row.original._id);
          dispatch(updateOrder(row.original._id, "pending"));
        }}
        sx={{ color: "#FFD700" }} // Gold - High contrast on black
      >
        Pending
      </MenuItem>,
      <MenuItem
        key="processing"
        onClick={() => {
          closeMenu();
          setCurrentRow(row.original);
          setOpenDialog(true);
          console.log(row.original._id);
          dispatch(updateOrder({ id: row.original._id, status: "processing" }));
        }}
        sx={{ color: "#FFA500" }} // Orange - High contrast on black
      >
        Processing
      </MenuItem>,
      <MenuItem
        key="shipped"
        onClick={() => {
          closeMenu();
          setCurrentRow(row.original);
          setOpenDialog(true);
          dispatch(updateOrder({ id: row.original._id, status: "shipped" }));
        }}
        sx={{ color: "#00CED1" }} // Dark Turquoise - Stands out on black
      >
        Shipped
      </MenuItem>,
      <MenuItem
        key="delivered"
        onClick={() => {
          closeMenu();
          setCurrentRow(row.original);
          setOpenDialog(true);
          dispatch(updateOrder({ id: row.original._id, status: "delivered" }));
        }}
        sx={{ color: "#32CD32" }} // Lime Green - High visibility on black
      >
        Delivered
      </MenuItem>,
      <MenuItem
        key="cancel"
        onClick={() => {
          closeMenu();
          setCurrentRow(row.original);
          setOpenDialog(true);
          dispatch(updateOrder({ id: row.original._id, status: "cancelled" }));
        }}
        sx={{ color: "#FF4500" }} // Orange Red - Easy to spot on black
      >
        Cancel
      </MenuItem>,
    ],

    renderTopToolbar: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "8px",
        }}
      >
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <MRT_GlobalFilterTextField table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Box>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Add a new order or open a new order dialog here
          }}
        >
          Add Order
        </Button> */}
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default OrdersDataTable;
