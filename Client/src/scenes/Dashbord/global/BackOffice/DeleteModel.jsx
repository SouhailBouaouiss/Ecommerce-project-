import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React from "react";

function DeleteModel({ fn, openDelete, handleCloseDelete }) {
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
    <Modal
      open={openDelete}
      onClose={handleCloseDelete}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <strong>
                Are you sure that you want to delete this document?
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} marginLeft={50}>
            <button className="custom-mui-btn" onClick={fn}>
              Delete
            </button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default DeleteModel;
