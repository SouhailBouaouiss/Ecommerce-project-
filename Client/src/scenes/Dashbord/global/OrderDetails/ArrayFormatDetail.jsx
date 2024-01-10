import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import React, { useMemo } from "react";

function ArrayFormatDetail({ value }) {
  const Total = useMemo(() => {
    return value.reduce((acc, elem) => acc + elem.price, 0);
  });
  return (
    <>
      <Grid item xs={12}>
        <Accordion
          style={{
            width: "100%",
            color: "#9e9ea4",
            backgroundColor: "rgb(25, 28, 36)",
          }}
        >
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <strong>Products</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {value.map((elem) => {
              return (
                <Grid
                  key={elem._id}
                  item
                  xs={12}
                  display={"flex"}
                  justifyContent={"space-between"}
                  gap={5}
                  width={"80%"}
                >
                  <Typography variant="body2">{elem.product_name} :</Typography>
                  <Typography variant="body2">
                    <strong>{elem.price} MAD</strong>
                  </Typography>
                </Grid>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} marginLeft={2}>
        <strong>Total price :</strong>
        <Typography variant="body2" display={"inline"} marginLeft={3}>
          {Total} MAD
        </Typography>
      </Grid>
    </>
  );
}

export default ArrayFormatDetail;
