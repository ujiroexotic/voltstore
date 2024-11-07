import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { Box, Button, MenuItem, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../state/orderSlice";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const OrdersDataTable = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((store) => store.orders);
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
        header: "Status",
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
    enableRowActions: true,
    enableRowSelection: true,
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Add a new order or open a new order dialog here
          }}
        >
          Add Order
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default OrdersDataTable;
