import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

function ObjectFormatDetail({ value }) {
  return (
    <>
      <Grid item xs={12}>
        <Accordion style={{ width: "100%", color: "#9e9ea4" }}>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <label>
                <strong>Customer Details :</strong>
              </label>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {Object.keys(value).map((item) => {
                return (
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    gap={1}
                  >
                    <Typography
                      variant="body2"
                      display={"inline"}
                      marginLeft={1}
                    >
                      {" "}
                      <label>{item} :</label>
                    </Typography>

                    <Typography
                      variant="body2"
                      display={"inline"}
                      marginLeft={1}
                    >
                      {String(value[item])}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
}

export default ObjectFormatDetail;
