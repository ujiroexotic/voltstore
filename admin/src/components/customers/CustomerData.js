import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";

const Example = () => {
  const [user, setUser] = useState([]); // State to hold user data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/users/getAll`,
          {
            withCredentials: true,
          }
        );
        console.log("User response: ", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users: ", error);
        setError(error);
      } finally {
        setIsLoading(false); // Stop loading once data is fetched or an error occurs
      }
    };
    fetchAllUsers();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
    ],
    []
  );

  // Define the table instance with conditional data
  const table = useMaterialReactTable({
    columns,
    data: user || [], // Ensure data is an array to avoid undefined errors
    state: { isLoading, error }, // Use loading and error states
  });

  // Render the table with loading and error handling
  return (
    <>
      {isLoading && <div>Loading data...</div>}
      {error && <div>Error loading data: {error.message}</div>}
      {!isLoading && !error && <MaterialReactTable table={table} />}
    </>
  );
};

export default Example;
