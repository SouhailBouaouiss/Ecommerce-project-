import { UserContext } from "../contexts/AuthContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { userTableFields } from "../util";
import DataTable from "../scenes/Dashbord/global/DataGrid";
import { axiosInstance } from "../api";
import { Button, TextField } from "@mui/material";
import { EditModel } from "../scenes/Dashbord/global/EditModel";
import DetailsModel from "../scenes/Dashbord/global/DetailsModel";
import { useForm } from "react-hook-form";
import DeleteModel from "../scenes/Dashbord/global/DeleteModel";
import CustomToolbar from "../scenes/CustomToolbar";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function User() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [id, setId] = useState("");
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const { register, handleSubmit, setValue, getValues, reset } = useForm();

  const { user } = useContext(UserContext);
  const { role } = user.data;

  const Userpath = "/v1/users/";

  // Second I am defining the useEffect that is going to retrieve data from the BckEnd

  useEffect(() => {
    axiosInstance
      .get(Userpath)
      .then((resp) => {
        const data = resp.data.data;
        console.log(data);
        toast.success(resp.data.message);
        return setUsers(data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  // UseMemo to stock the rows of the dataTable

  const rows = useMemo(
    () =>
      users.map((elm) => {
        return {
          id: elm._id,
          first_name: elm.first_name,
          last_name: elm.last_name,
          email: elm.email,
          last_login: elm.last_login,
          role: elm.role,
          creation_date: elm.creation_date,
        };
      }),
    [users]
  );
  console.log(rows);

  const statusRow = useMemo(() => {
    return users.map(
      ({ first_name, last_name, email, role, user_name, pwd }) => ({
        first_name,
        last_name,
        email,
        role,
        user_name,
        pwd,
      })
    );
  }, [users]);

  const columns = useMemo(() => {
    if (role === "admin") {
      return [
        ...userTableFields,

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
                Edit
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
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDeleteClick(row)}
              >
                Delete
              </Button>
            </div>
          ),
        },
      ];
    } else {
      return [
        ...userTableFields,

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
      ];
    }
  }, [role]);

  // THIS PART IS RELATED TO THE OPENING AND CLOSE OF THE MODEL OF EDIT

  // Handle close

  const handleClose = () => {
    setOpen(false);
    setUserToEdit({});
  };

  const handleOpen = (row) => {
    setOpen(true);
    setUserToEdit(row);
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
      .put(`/v1/users/${userToEdit.id}`, filterValuesToEdit(getValues()))
      .then((resp) => {
        const data = resp.data.data;

        toast.success(resp.data.message);
        setUsers((prev) => {
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
        setUserToEdit({});
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

  const handleDeleteClick = (row) => {
    setOpenDelete(true);
    setUserToEdit(row);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setUserToEdit({});
  };

  const handleDeleteConfirmation = () => {
    axiosInstance.delete(`/v1/users/${userToEdit.id}`).then((resp) => {
      const message = resp.data.message;
      console.log(message);
      console.log(resp);
      toast.warning(message);
      setUsers((prev) => {
        return prev.filter((elm) => {
          return elm._id !== userToEdit.id;
        });
      });
      setOpenDelete(false);
    });
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleAddCustomer = () => {
    console.log(getValues());
    axiosInstance
      .post(`/v1/users/`, getValues())
      .then((resp) => {
        const data = resp.data.data;
        toast.success(resp.data.message);
        const user = resp.data.user;

        setUsers((prev) => [...prev, user]);
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const inputElements = (arr) => {
    return arr.map((elm) => {
      if (elm === "role") {
        return (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...register(elm)}
                label={elm}
                fullWidth
              >
                <MenuItem value={"admin"}>admin</MenuItem>
                <MenuItem value={"manager"}>manager</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      }
      return (
        <TextField
          {...register(elm)}
          fullWidth
          label={elm}
          variant="outlined"
        />
      );
    });
  };

  return (
    <div
      style={{ width: "93%", backgroundColor: "#0b2f3a94" }}
      className="mt-10 ms-10"
    >
      <CustomToolbar
        name={"User"}
        arr={users}
        fn={handleAddCustomer}
        handleCloseAdd={handleCloseAdd}
        handleOpenAdd={handleOpenAdd}
        setOpenAdd={setOpenAdd}
        inputElements={inputElements}
        openAdd={openAdd}
        register={register}
        getValues={getValues}
        handleSubmit={handleSubmit}
        setValue={setValue}
      />
      <DataTable rows={rows} columns={columns} />
      <EditModel
        arr={statusRow}
        fn={handleEdit}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        setCustomerToEdit={setUserToEdit}
        customerToEdit={userToEdit}
        register={register}
        handleSubmit={handleSubmit}
      />
      <DetailsModel
        id={id}
        setId={setId}
        handleCloseDetails={handleCloseDetails}
        openDetails={openDetails}
        path={Userpath}
      />
      <DeleteModel
        fn={handleDeleteConfirmation}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
    </div>
  );
}

export default User;
