import {
  Button,
  Grid,
  Typography,
  TextField,
  Modal,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import React, { useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";

function CustomToolbar({
  name,
  arr,
  fn,
  handleCloseAdd,
  handleOpenAdd,
  setOpenAdd,
  openAdd,
  register,
  handleSubmit,
  setValue,
  getValues,
  inputElements,
}) {
  const ressourceProperties = useMemo(() => {
    if (arr.length == 0) return [];
    return Object.keys(arr[0]);
  });
  console.log(ressourceProperties);

  const excludeElements = (array) => {
    return array.filter((elm) => {
      return (
        elm !== "_id" &&
        elm !== "id" &&
        elm !== "creation_date" &&
        elm !== "active" &&
        elm !== "last_login"
      );
    });
  };

  const gridElements = excludeElements(ressourceProperties);
  console.log(gridElements);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "rgb(25, 28, 36)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  };

  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="overline" fontSize={20} lineHeight={1}>
          {name} List
        </Typography>
      </Grid>

      <Grid item>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          color="info"
          onClick={handleOpenAdd}
          size="small"
        >
          Add {name}
        </Button>
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit(fn)}>
              <Grid item xs={12}>
                {inputElements(gridElements)}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
}

export default CustomToolbar;
