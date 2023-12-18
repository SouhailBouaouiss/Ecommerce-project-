import React, { useContext, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../api";
import { toast } from "react-toastify";
import DataTable from "../scenes/Dashbord/global/DataGrid";
import { userTableFields } from "../util";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid, Typography, TextField } from "@mui/material";
import { UserContext } from "../contexts/AuthContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";

export default function User() {
  const [users, setUsers] = useState([]);

  const { user } = useContext(UserContext);
  const role = user.data.role;
  console.log(role);

  const [userToEdit, setUserToEdit] = useState({
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    user_name: null,
    role: null,
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log("khdama ana");
    const { name, value } = event.target;
    setSelectedUserUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();

    axiosInstance
      .put(`/v1/users/${selectedUserUpdate._id}`, selectedUserUpdate)
      .then((resp) => {
        const { data, message } = resp.data;
        console.log(data);
        toast.success(message);

        setUsers((prev) => {
          console.log(prev);
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
    setOpenEdit(false);
  };

  const handleDeleteClick = (row) => {
    const productToDeleteId = row.id;
    console.log(productToDeleteId);
    axiosInstance
      .delete(`/v1/users/${productToDeleteId}`)
      .then((resp) => {
        const message = resp.data.message;
        toast.warning(message);
        setUsers((prev) => {
          return prev.filter((elm) => {
            return elm._id !== productToDeleteId;
          });
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      });
  };

  useEffect(() => {
    axiosInstance
      .get("/v1/users")
      .then((resp) => {
        const data = resp.data.data;
        console.log(data);
        toast.success(resp.data.message);
        return setUsers(data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return setUsers([]);
      });
  }, []);

  console.log(users);

  const rows = useMemo(() => {
    return users.map((elm) => {
      return {
        id: elm._id,
        first_name: elm.first_name,
        last_name: elm.last_name,
        role: elm.role,
        creation_date: elm.creation_date,
      };
    });
  }, [users]);

  const columns = useMemo(() => {
    if (role === "manager") {
      return [
        ...userTableFields,
        {
          field: "details",
          headerName: "Details",
          sortable: false,
          width: 150,
          renderCell: ({ row, field }) => (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen(row)}
              >
                Show Details
              </Button>
            </div>
          ),
        },
      ];
    }
    return [
      ...userTableFields,
      {
        field: "edit",
        headerName: "Edit",
        sortable: false,
        width: 150,
        renderCell: ({ row, field }) => {
          if (role === "admin") {
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenUpdate(row)}
              >
                Edit
              </Button>
            );
          }
        },
      },
      {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        width: 150,
        renderCell: ({ row, field }) => {
          if (role === "admin") {
            return (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDeleteClick(row)}
                >
                  Delete
                </Button>
              </div>
            );
          }
        },
      },
      {
        field: "details",
        headerName: "Details",
        sortable: false,
        width: 150,
        renderCell: ({ row, field }) => (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen(row)}
            >
              Show Details
            </Button>
          </div>
        ),
      },
    ];
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedUser, setselectedUser] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUserUpdate, setSelectedUserUpdate] = useState({});

  const handleOpen = (data) => {
    setOpen(true);
    console.log(data.id);
    const id = data.id;
    axiosInstance
      .get(`/v1/users/${id}`)
      .then((resp) => {
        const data = resp.data.data;
        setselectedUser(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleOpenUpdate = (data) => {
    const id = data.id;
    axiosInstance.get(`/v1/users/${id}`).then((resp) => {
      const data = resp.data.data;
      setOpenEdit(true);
      setSelectedUserUpdate(data);
    });
  };

  console.log(selectedUserUpdate);

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const { register, handleSubmit, getValues } = useForm();

  return (
    <div>
      <Modal
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmitEdit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  defaultValue={selectedUserUpdate.first_name}
                  onChange={handleChange}
                  fullWidth
                  name="first_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  defaultValue={selectedUserUpdate.last_name}
                  onChange={handleChange}
                  fullWidth
                  name="last_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  defaultValue={selectedUserUpdate.email}
                  onChange={handleChange}
                  fullWidth
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  variant="outlined"
                  defaultValue={selectedUserUpdate.user_name}
                  onChange={handleChange}
                  fullWidth
                  name="user_name"
                />
              </Grid>

              {role === "admin" && (
                <>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? "Eye" : "Show"}
                            </IconButton>
                          </InputAdornment>
                        }
                        defaultValue={selectedUserUpdate.pwd}
                        onChange={handleChange}
                        label="Password"
                        name="pwd"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={role}
                        label="Role"
                        defaultValue={selectedUserUpdate.role}
                        onChange={handleChange}
                      >
                        <MenuItem value={"manager"}>Manager</MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              User Information
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Active : {String(selectedUser.active)}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Email : {selectedUser.email}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              First Name : {selectedUser.first_name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Last Name : {selectedUser.last_name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              User Name : {selectedUser.user_name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Role : {selectedUser.role}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Creation Date : {selectedUser.creation_date}
            </Typography>
          </form>
        </Box>
      </Modal>
      {role === "admin" && (
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: 20, marginTop: 12 }}
        >
          Add New User
        </Button>
      )}
      <DataTable rows={rows} columns={columns} />
    </div>
  );
}
