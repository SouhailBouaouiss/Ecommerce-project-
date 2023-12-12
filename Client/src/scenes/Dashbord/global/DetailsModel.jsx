import { Box, Grid, Modal, Typography, colors } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../../api";
import { toast } from "react-toastify";

function DetailsModel({ openDetails, handleCloseDetails, id, setId }) {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    console.log(id);
    if (id.length == 0) {
      setDetails({});
    } else {
      axiosInstance
        .get(`/v1/orders/${id}`)
        .then((resp) => {
          const data = resp.data.data;
          console.log(data);

          toast.success(resp.data.message);
          setDetails(data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
        });
    }
  }, [id]);
  console.log(details);

  const keys = Object.keys(details);

  const orderDetails = useMemo(() => {
    return keys.map((elm) => {
      let value = details[elm];
      if (typeof value === "string") {
        return (
          <Grid item xs={12}>
            <label>
              <strong>{elm} :</strong>
            </label>
            <Typography variant="body2" display={"inline"} marginLeft={4}>
              {String(value)}
            </Typography>
          </Grid>
        );
      } else if (Array.isArray(value)) {
        return value.map((elem) => {
          return object.keys(elem).map((item) => {
            return (
              <Grid item xs={12}>
                <label></label>
                <Typography variant="body2">
                  <strong>{item}</strong> : {value[elem][item]}
                </Typography>
              </Grid>
            );
          });
        });
      } else if (
        typeof value === "object" &&
        value !== null &&
        value.constructor === Object
      ) {
        return (
          <>
            <Typography marginTop={4} marginLeft={2}>
              <strong>Customer Details :</strong>
            </Typography>
            <Box paddingLeft={5} marginBottom={2} marginTop={2}>
              <Grid container>
                {Object.keys(value).map((item) => {
                  return (
                    <Grid item xs={12}>
                      <label>
                        <strong>{item} :</strong>
                      </label>
                      <Typography
                        variant="body2"
                        display={"inline"}
                        marginLeft={4}
                      >
                        {String(value[item])}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </>
        );
      }
      return "";
    });
  }, [details]);

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
  return (
    <Modal
      open={openDetails}
      onClose={handleCloseDetails}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          {orderDetails}
        </Grid>
      </Box>
    </Modal>
  );
}

export default DetailsModel;
