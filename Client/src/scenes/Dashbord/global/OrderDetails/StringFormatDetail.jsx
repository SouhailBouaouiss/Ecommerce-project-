import { Grid, Typography } from "@mui/material";
import React from "react";

function StringFormatDetail({ elm, value }) {
  return (
    <Grid item xs={12} marginLeft={2}>
      <strong>{elm} :</strong>

      <Typography variant="body2" display={"inline"} marginLeft={3}>
        {String(value)}
      </Typography>
    </Grid>
  );
}

export default StringFormatDetail;
