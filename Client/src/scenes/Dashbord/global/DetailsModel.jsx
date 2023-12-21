import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Modal,
  Typography,
  colors,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../../api";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderDetails from "./OrderDetails";

function DetailsModel({ openDetails, handleCloseDetails, id, setId, path }) {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    console.log(id);
    if (id.length == 0) {
      setDetails({});
    } else {
      axiosInstance
        .get(path + id)
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

  // const orderDetails = useMemo(() => {
  //   const keys = Object.keys(details);
  //   return keys.map((elm) => {
  //     let value = details[elm];
  //     console.log(value);
  //     if (typeof value === "string") {
  //       return (
  //         <Grid item xs={12} marginLeft={2}>
  //           <label>
  //             <strong>{elm} :</strong>
  //           </label>
  //           <Typography variant="body2" display={"inline"} marginLeft={3}>
  //             {String(value)}
  //           </Typography>
  //         </Grid>
  //       );
  //     } else if (Array.isArray(value)) {
  //       return (
  //         <>
  //           <Grid item xs={12}>
  //             <Accordion style={{ width: "100%", color: "#9e9ea4" }}>
  //               <AccordionSummary
  //                 expandIcon={<ExpandMoreIcon />}
  //                 aria-controls="panel1a-content"
  //                 id="panel1a-header"
  //               >
  //                 <Typography>
  //                   <label>
  //                     <strong>Products</strong>
  //                   </label>
  //                 </Typography>
  //               </AccordionSummary>
  //               <AccordionDetails>
  //                 {value.map((elem) => {
  //                   return (
  //                     <Grid
  //                       key={elem._id}
  //                       item
  //                       xs={12}
  //                       display={"flex"}
  //                       justifyContent={"space-between"}
  //                       gap={5}
  //                       width={"80%"}
  //                     >
  //                       <Typography variant="body2">
  //                         {elem.product_name} :
  //                       </Typography>
  //                       <Typography variant="body2">
  //                         <strong>{elem.price} MAD</strong>
  //                       </Typography>
  //                     </Grid>
  //                   );
  //                 })}
  //               </AccordionDetails>
  //             </Accordion>
  //           </Grid>
  //           <Grid item xs={12} marginLeft={2}>
  //             <strong>Total price :</strong>
  //             <Typography variant="body2" display={"inline"} marginLeft={3}>
  //               {value.reduce((acc, elem) => acc + elem.price, 0)} MAD
  //             </Typography>
  //           </Grid>
  //         </>
  //       );
  //     } else if (
  //       typeof value === "object" &&
  //       value !== null &&
  //       value.constructor === Object
  //     ) {
  //       return (
  //         <>
  //           <Grid item xs={12}>
  //             <Accordion style={{ width: "100%", color: "#9e9ea4" }}>
  //               <AccordionSummary
  //                 expandIcon={<ExpandMoreIcon />}
  //                 aria-controls="panel1a-content"
  //                 id="panel1a-header"
  //               >
  //                 <Typography>
  //                   <label>
  //                     <strong>Customer Details :</strong>
  //                   </label>
  //                 </Typography>
  //               </AccordionSummary>
  //               <AccordionDetails>
  //                 <Grid container>
  //                   {Object.keys(value).map((item) => {
  //                     return (
  //                       <Grid
  //                         item
  //                         xs={12}
  //                         display={"flex"}
  //                         justifyContent={"flex-start"}
  //                         gap={1}
  //                       >
  //                         <Typography
  //                           variant="body2"
  //                           display={"inline"}
  //                           marginLeft={1}
  //                         >
  //                           {" "}
  //                           <label>{item} :</label>
  //                         </Typography>

  //                         <Typography
  //                           variant="body2"
  //                           display={"inline"}
  //                           marginLeft={1}
  //                         >
  //                           {String(value[item])}
  //                         </Typography>
  //                       </Grid>
  //                     );
  //                   })}
  //                 </Grid>
  //               </AccordionDetails>
  //             </Accordion>
  //           </Grid>
  //         </>
  //       );
  //     }
  //     return "";
  //   });
  // }, [details]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: "70vh",
    overflowY: "auto",
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
        <Grid container spacing={2} gap={3}>
          <OrderDetails details={details} />
        </Grid>
      </Box>
    </Modal>
  );
}

export default DetailsModel;
