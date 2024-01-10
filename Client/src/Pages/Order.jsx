import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { customerTableFields, orderTableFields } from "../util";
import DataTable from "../scenes/Dashbord/global/BackOffice/DataGrid";
import { axiosInstance } from "../api";
import { Button, IconButton, Typography } from "@mui/material";
import { EditModel } from "../scenes/Dashbord/global//BackOffice/EditModel";
import DetailsModel from "../scenes/Dashbord/global/BackOffice/DetailsModel";
import { useForm } from "react-hook-form";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";

function Order() {
  // Logic part

  // First I am defining the state where I am going to stock the orders data

  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState({});
  const [id, setId] = useState("");
  const [openDetails, setOpenDetails] = useState(false);

  const { register, handleSubmit, setValue, getValues } = useForm();

  const Orderpath = "/v1/orders/";

  // Second I am defining the useEffect that is going to retrieve data from the BckEnd

  useEffect(() => {
    axiosInstance
      .get(Orderpath)
      .then((resp) => {
        const data = resp.data.data;
        console.log(data);
        toast.success("orders fetched successfully");
        return setOrders(data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        // mongodb+srv://souhail:tRHfUT.G8WQk-PV@firstcluster.aihbxtp.mongodb.net/
      });
  }, []);

  // UseMemo to stock the rows of the dataTable

  const rows = useMemo(
    () =>
      orders.map((elm) => {
        return {
          id: elm._id,
          customer_id: elm.customer_id,
          order_date: elm.order_date,
          status: elm.status,
        };
      }),
    [orders]
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
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: ({ row, field }) => (
        <div>
          <IconButton
            variant="contained"
            color="info"
            onClick={() => handleOpenDetails(row)}
          >
            <RemoveRedEyeIcon color="info" fontSize="small" />
          </IconButton>
          <IconButton
            variant="contained"
            color="info"
            onClick={() => handleOpen(row)}
          >
            <EditIcon color="info" fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  // THIS PART IS RELATED TO THE OPENING AND CLOSE OF THE MODEL OF EDIT

  // Handle close

  const handleClose = () => setOpen(false);

  const handleOpen = (row) => {
    setOpen(true);
    setOrderToEdit(row);
  };

  const filterValuesToEdit = (obj) => {
    const result = {};
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        typeof obj[key] === "string" &&
        obj[key].trim() !== ""
      ) {
        result[key] = obj[key];
      }
    }
    return result;
  };

  const handleEdit = () => {
    axiosInstance
      .put(`/v1/orders/${orderToEdit.id}`, filterValuesToEdit(getValues()))
      .then((resp) => {
        const data = resp.data.data;

        toast.success(resp.data.message);
        setOrders((prev) => {
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
        setOrderToEdit({});
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
        console.error(error);
      });
  };

  // This part is related to the detail model logic

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
        width: "93%",
        maxWidth: "1190px",
        backgroundColor: "rgb(25, 28, 36)",
        color: "white",
        position: "absolute",
        top: "42%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
      className="p-4 mt-10"
    >
      <Typography variant="overline" fontSize={20} lineHeight={1}>
        Order List
      </Typography>

      <DataTable rows={rows} columns={columns} />
      <EditModel
        currentPage={"order"}
        arr={statusRow}
        fn={handleEdit}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        setCustomerToEdit={setOrderToEdit}
        customerToEdit={orderToEdit}
        register={register}
        handleSubmit={handleSubmit}
        statusOptions={["pending", "processing", "shipped", "delivered"]}
      />
      <DetailsModel
        id={id}
        setId={setId}
        handleCloseDetails={handleCloseDetails}
        openDetails={openDetails}
        path={Orderpath}
      />
    </div>
  );
}

export default Order;
