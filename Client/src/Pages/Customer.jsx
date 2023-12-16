import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../api";
import { toast } from "react-toastify";
import DataTable from "../scenes/Dashbord/global/DataGrid";
import { customerTableFields } from "../util";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { EditModel } from "../scenes/Dashbord/global/EditModel";
import CustomToolbar from "../scenes/CustomToolbar";
import { useForm } from "react-hook-form";
import DeleteModel from "../scenes/Dashbord/global/DeleteModel";

function Customer() {
  // Logic part

  // First I am defining the state where I am going to stock the customers data

  const [Customers, setCustomers] = useState([]);

  // useState of delete model open

  const [openDelete, setOpenDelete] = useState(false);
  // useState of the current customer to Edit

  const [customerToEdit, setCustomerToEdit] = useState({});

  const [openAdd, setOpenAdd] = useState(false);
  // userForm hook
  const { register, handleSubmit, setValue, getValues } = useForm();

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

  const handleClose = () => {
    setOpen(false);
    setCustomerToEdit({});
  };

  const handleOpen = (row) => {
    setCustomerToEdit(row);
    setOpen(true);
  };

  const handleDeleteClick = (row) => {
    setOpenDelete(true);
    setCustomerToEdit(row);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setCustomerToEdit({});
  };

  const handleDeleteConfirmation = () => {
    axiosInstance.delete(`/v1/customers/${customerToEdit.id}`).then((resp) => {
      const message = resp.data.message;
      console.log(message);
      console.log(resp);
      toast.warning(message);
      setCustomers((prev) => {
        return prev.filter((elm) => {
          return elm._id !== customerToEdit.id;
        });
      });
      setOpenDelete(false);
    });
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
      .put(
        `/v1/customers/${customerToEdit.id}`,
        filterValuesToEdit(getValues())
      )
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
        setCustomerToEdit({});
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
        console.error(error);
      });
  };

  // THIS PART IS RELATED TO THE OPENING AND CLOSE OF THE MODEL OF ADD

  // Handle close

  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  // Handle add submit

  const handleAddCustomer = () => {};

  const inputElements = (arr) => {
    return arr.map((elm) => {
      if (elm == "valid_account" || elm == "active") {
        return (
          <FormControlLabel
            control={<Switch defaultChecked {...register(elm)} labe />}
            label={elm}
          />
        );
      }
      return (
        <TextField
          fullWidth
          label={elm}
          // name="product_name"
          variant="outlined"
          {...register(elm)}
        />
      );
    });
  };
  // JSX part
  return (
    <div
      style={{
        backgroundColor: "#0b2f3a94",
        color: "wheat",
      }}
      className="mt-10 ms-10"
    >
      <CustomToolbar
        name={"Customer"}
        arr={Customers}
        fn={handleAddCustomer}
        handleCloseAdd={handleCloseAdd}
        handleOpenAdd={handleOpenAdd}
        setOpenAdd={setOpenAdd}
        openAdd={openAdd}
        inputElements={inputElements}
        register={register}
        getValues={getValues}
        handleSubmit={handleSubmit}
        setValue={setValue}
      ></CustomToolbar>
      <DataTable rows={rows} columns={columns} />
      <EditModel
        arr={rows}
        fn={handleEdit}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        setCustomerToEdit={setCustomerToEdit}
        customerToEdit={customerToEdit}
        register={register}
        handleSubmit={handleSubmit}
      />
      <DeleteModel
        fn={handleDeleteConfirmation}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
    </div>
  );
}

export default Customer;
