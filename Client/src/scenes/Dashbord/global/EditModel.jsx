import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Grid, Typography, TextField, InputBase } from "@mui/material";

export function EditModel({
  arr,
  fn,
  open,
  setOpen,
  handleClose,
  setCustomerToEdit,
  customerToEdit,
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

  const { register, getValue, handleSubmit } = useForm();

  // useMemo to get the keys of the rows array

  const ressourceProperties = useMemo(() => {
    if (arr.length == 0) return [];
    return Object.keys(arr[0]);
  });

  // JSX part
  console.log("Edit Modal -- Rendering", customerToEdit);

  const renderInputs = useMemo(() => {
    return ressourceProperties.map((elm) => {
      console.log("Elem", customerToEdit[elm]);
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
