import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { customerTableFields, orderTableFields } from "../util";
import DataTable from "../scenes/Dashbord/global/DataGrid";
import { axiosInstance } from "../api";
import { Button } from "@mui/material";
import { EditModel } from "../scenes/Dashbord/global/EditModel";
import DetailsModel from "../scenes/Dashbord/global/DetailsModel";

function Order() {
  // Logic part

  // First I am defining the state where I am going to stock the orders data

  const [orders, setOrders] = useState([]);

  // Second I am defining the useEffect that is going to retrieve data from the BckEnd

  useEffect(() => {
    axiosInstance
      .get("/v1/orders")
      .then((resp) => {
        const data = resp.data.data;
        console.log(data);
        toast.success(resp.data.message);
        return setOrders(data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        // mongodb+srv://souhail:tRHfUT.G8WQk-PV@firstcluster.aihbxtp.mongodb.net/
        return setCustomers([]);
      });
  }, []);

  // UseMemo to stock the rows of the dataTable

  const rows = useMemo(() =>
    orders.map((elm) => {
      return {
        id: elm._id,
        customer_id: elm.customer_id,
        order_date: elm.order_date,
        status: elm.status,
      };
    })
  );
  console.log(rows);

  const statusRow = useMemo(() => {
    return orders.map((elm) => ({
      status: elm.status,
    }));
  }, [orders]);

  const columns = [
    ...orderTableFields,
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
      field: "show details",
      headerName: "Show Details",
      sortable: false,
      width: 150,
      renderCell: ({ row, field }) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDetails(row)}
          >
            Show Details
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
    setOrderToEdit(row);
  };

  const [orderToEdit, setOrderToEdit] = useState({});
  const handleEdit = () => {};

  // This part is related to the detail model logic

  const [openDetails, setOpenDetails] = useState(false);
  const [id, setId] = useState("");
  const handleOpenDetails = (row) => {
    setOpenDetails(true);
    setId(row.id);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

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
        arr={statusRow}
        fn={handleEdit}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        setCustomerToEdit={setOrderToEdit}
        customerToEdit={orderToEdit}
      />
      <DetailsModel
        id={id}
        setId={setId}
        handleCloseDetails={handleCloseDetails}
        openDetails={openDetails}
      />
    </div>
  );
}

export default Order;
