import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { Box, Button, MenuItem, Typography, lighten } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import { openSuccessDialog } from "../../state/dialogSlice";
import { getAllProducts } from "../../state/productSlice";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const ProductDataTable = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((store) => store.products);
  const data = useMemo(() => products, [products]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const { successDialog } = useSelector((store) => store.dialog);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, successDialog]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 250,
        Cell: ({ renderedCellValue }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography>{renderedCellValue}</Typography>
          </Box>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 200,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
        Cell: ({ renderedCellValue }) => `$${renderedCellValue.toFixed(2)}`,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
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
    state: { isLoading },
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
        key="edit"
        onClick={() => {
          closeMenu();
          setCurrentRow(row.original);
          setOpenDialog(true);
        }}
      >
        {/* <Button color="error" variant="contained"> */}
        <EditRoundedIcon color="info" sx={{ mr: 1 }} />
        {/* </Button> */}
      </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() => {
          closeMenu();
          setCurrentRow(row.original);
          setOpenDialog(true);
        }}
      >
        {/* <Button color="error" variant="contained"> */}
        <DeleteForeverRoundedIcon color="error" sx={{ mr: 1 }} />
        {/* </Button> */}
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Button
            sx={{
              padding: "8px 16px",
              backgroundColor: "#159eec",
              color: "#fff",
              "&:hover": { backgroundColor: "#127abb" },
            }}
            onClick={() => dispatch(openSuccessDialog())}
          >
            Add a Product
          </Button>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

const ProductDataTableWithLocalizationProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ProductDataTable />
  </LocalizationProvider>
);

export default ProductDataTableWithLocalizationProvider;
