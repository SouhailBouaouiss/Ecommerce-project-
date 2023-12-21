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
}) {
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
      console.log("Elem", elm);
      // console.log("Elem", customerToEdit[elm]);
      if (elm === "status") {
        return (
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...register(elm)}
                label={elm}
                fullWidth
              >
                <MenuItem value={"pending"}>pending</MenuItem>
                <MenuItem value={"processing"}>processing</MenuItem>
                <MenuItem value={"delivered"}>delivered</MenuItem>
                <MenuItem value={"shipped"}>shipped</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      }

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
