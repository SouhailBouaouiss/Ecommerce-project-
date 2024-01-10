import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../api";
import { toast } from "react-toastify";
import DataTable from "../scenes/Dashbord/global/BackOffice/DataGrid";
import { customerTableFields } from "../util";
import {
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { EditModel } from "../scenes/Dashbord/global/BackOffice/EditModel";

import { useForm } from "react-hook-form";
import DeleteModel from "../scenes/Dashbord/global/BackOffice/DeleteModel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: ({ row, field }) => (
        <div>
          <IconButton
            variant="contained"
            color="info"
            onClick={() => handleOpen(row)}
          >
            <EditIcon color="info" fontSize="small" />
          </IconButton>
          <IconButton
            variant="contained"
            color="error"
            onClick={() => handleDeleteClick(row)}
          >
            <DeleteForeverIcon color="error" fontSize="small" />
          </IconButton>
        </div>
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

  // JSX part
  return (
    <>
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
          Customer List
        </Typography>
        <DataTable rows={rows} columns={columns} />
        <EditModel
          currentPage={"customer"}
          statusOptions={[
            { label: "active", value: true },
            { label: "inactive", value: false },
          ]}
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
      </div>

      <DeleteModel
        fn={handleDeleteConfirmation}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
    </>
  );
}

export default Customer;
