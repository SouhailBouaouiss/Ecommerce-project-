import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Grid, Typography, TextField, InputBase } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export function EditModel({
  arr,
  fn,
  open,
  setOpen,
  handleClose,
  setCustomerToEdit,
  customerToEdit,
  register,
  handleSubmit,
  statusOptions,
  currentPage,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#9e9ea4",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  };

  // useMemo to get the keys of the rows array

  const ressourceProperties = useMemo(() => {
    if (arr.length == 0) return [];
    return Object.keys(arr[0]);
  }, [arr]);

  // { name: "customer, customer: " + customer, value: "customer ....}
  // ["name", "customer, "value"]

  // JSX part
  console.log("Edit Modal -- Rendering", customerToEdit);

  const renderInputs = useMemo(() => {
    return ressourceProperties.map((elm) => {
      if (elm === "status") {
        console.log(currentPage, statusOptions);
        return (
          <Box sx={{ width: "100%", marginTop: 2, marginLeft: 2, width: 530 }}>
            <FormControl fullWidth>
              <InputLabel id="form-status">Status</InputLabel>
              <Select
                color="primary"
                labelId="form-status"
                id="status-select"
                {...register(elm)}
                label={elm}
              >
                {statusOptions.map((status, index) => (
                  <MenuItem
                    style={{ width: "100%" }}
                    key={index}
                    value={currentPage == "customer" ? status.value : status}
                    fullWidth
                  >
                    {currentPage == "customer" ? status.label : status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      }

      if (elm === "role") {
        return (
          <Box sx={{ minWidth: 120, marginTop: 2, marginLeft: 2, width: 530 }}>
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

      if (elm !== "id" && elm !== "last_login") {
        return (
          <Grid key={elm + customerToEdit[elm]} item xs={12}>
            <TextField
              key={elm + customerToEdit[elm]}
              fullWidth
              label={elm}
              placeholder={customerToEdit[elm]}
              variant="outlined"
              {...register(elm)}
              style={{ border: "1px white" }}
            />
          </Grid>
        );
      }

      return;
    });
  }, [customerToEdit, ressourceProperties]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(fn)}>
          <Grid container spacing={2}>
            {renderInputs}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
