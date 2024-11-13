import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
//   import { data } from './makeData';
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../state/transactionSlice";
const columnHelper = createMRTColumnHelper();

const f = new Intl.DateTimeFormat("en-us", {
  dateStyle: "short",
  // timeStyle: "short",
});

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const TableData = () => {
  const { transactions, isLoading, error } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();
  const data = useMemo(() => transactions, [transactions]);
  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);
  const columns = useMemo(() => [
    {
      accessorKey: "order",
      header: "Order ID",
      size: 220,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      size: 220,
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      size: 220,
    },
    {
      accessorKey: "transactionId",
      header: "Transaction ID",
      enableClickToCopy: true,
      size: 500,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 220,
    },
    {
      accessorFn: (row) => new Date(row.paidAt), //convert to Date for sorting and filtering
      id: "paidAt",
      header: "Payment Date",
      filterVariant: "date",
      filterFn: "lessThan",
      sortingFn: "datetime",
      Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
      Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
      muiFilterTextFieldProps: {
        sx: {
          minWidth: "250px",
        },
      },
    },
  ]);

  const handleExportPdfRows = (rows) => {
    const doc = new jsPDF();

    // Filter out the "Order ID" column and get the headers for other columns
    const tableHeaders = columns
      .filter((column) => column.header !== "Order ID") // Exclude "Order ID"
      .map((column) => column.header); // Extract the header names

    // Map rows data based on the filtered headers
    const tableData = rows.map((row) => [
      row.amount,
      row.paymentMethod,
      row.transactionId,
      row.status,
      f.format(new Date(row.paidAt)),
    ]);

    autoTable(doc, {
      head: [tableHeaders], // Use filtered headers here
      body: tableData,
    });

    doc.save("VoltStore-Transaction-Data.pdf");
  };

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableRowNumbers: true,
    enableRowVirtualization: true,
    state: { isLoading: isLoading },
    muiCircularProgressProps: {
      color: "primary",
      thickness: 5,
      size: 55,
    },
    muiSkeletonProps: {
      animation: "pulse",
      height: 28,
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={() => handleExportPdfRows(data)}
          startIcon={<FileDownloadIcon />}
        >
          Export PDF
        </Button>
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data(CSV)
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows(CSV)
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows(CSV)
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows(CSV)
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default TableData;
