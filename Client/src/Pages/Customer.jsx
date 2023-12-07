import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../api";
import { toast } from "react-toastify";
import DataTable from "../scenes/Dashbord/global/DataGrid";
import { customerTableFields } from "../util";

function Customer() {
  // Logic part

  // First I am defining the state where I am going to stock the customers data

  const [Customers, setCustomers] = useState([]);

  // Second I am defining the useEffect that is going to retrieve data from the BckEnd

  useEffect(() => {
    axiosInstance
      .get("/v1/customers")
      .then((resp) => {
        const data = resp.data.data;
        toast.success(resp.data.message);
        return setCustomers(data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return setCustomers([]);
      });
  }, []);

  // UseMemo to stock the rows of the dataTable

  const rows = useMemo(() =>
    Customers.map((elm) => {
      return {
        id: elm._id,
        first_name: elm.first_name,
        last_name: elm.last_name,
        email: elm.email,
        last_login: elm.last_login,
        status: elm.active,
      };
    })
  );

  const columns = [...customerTableFields];

  // JSX part
  return <DataTable rows={rows} columns={columns} />;
}

export default Customer;
