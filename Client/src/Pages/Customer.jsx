import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../api";
import { toast } from "react-toastify";
import DataTable from "../scenes/Dashbord/global/DataGrid";
import { customerTableFields } from "../util";
import { Button } from "@mui/material";
import { EditModel } from "../scenes/Dashbord/global/EditModel";

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

  const columns = [
    ...customerTableFields,
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 150,
      renderCell: ({ row, field }) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(row)}
          >
            Open modal
          </Button>
        </div>
      ),
    },

    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 150,
      renderCell: ({ row, field }) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDeleteClick(row)}
        >
          Action
        </Button>
      ),
    },
  ];

  // THIS PART IS RELATED TO THE OPENING AND CLOSE OF THE MODEL OF EDIT

  const [open, setOpen] = useState(false);

  // Handle close

  const handleClose = () => setOpen(false);

  const handleOpen = (row) => {
    setOpen(true);
    setCustomerToEdit(row);
  };

  // THIS PART IS RELATED TO THE CUSTOMER DATA EDIT LOGIC
  //
  //
  // useState of the current customer to Edit

  const [customerToEdit, setCustomerToEdit] = useState({});

  // HandleEdit

  const handleEdit = () => {
    axiosInstance
      .put("/v1/customers", customerToEdit)
      .then((resp) => {
        const data = resp.data.data;

        toast.success(resp.data.message);
        setCustomers((prev) => {
          return prev.map((elm) => {
            console.log(elm._id, data._id);
            if (elm._id == data._id) {
              console.log(elm, "found", elm, data._id);
              return data;
            } else {
              return elm;
            }
          });
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
        console.error(error);
      });
  };

  // JSX part
  return (
    <div
      style={{
        height: 400,
        width: "93%",
        backgroundColor: "#0b2f3a94",
        color: "wheat",
      }}
      className="mt-10 ms-10"
    >
      <DataTable rows={rows} columns={columns} />
      <EditModel
        arr={rows}
        fn={handleEdit}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        setCustomerToEdit={setCustomerToEdit}
        customerToEdit={customerToEdit}
      />
    </div>
  );
}

export default Customer;
