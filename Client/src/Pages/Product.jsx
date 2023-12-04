import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { tableFields } from "../util";
import { UserContext } from "../contexts/AuthContext";
import { set } from "mongoose";

export default function Product() {
  // Import the user context

  const user = React.useContext(UserContext);

  //Creat a state for products

  const [products, setProducts] = React.useState([]);

  // Creat a state for modals

  const [data, setData] = React.useState({
    id: null,
    product: null,
    quantity: null,
    price: null,
  });

  const rows = React.useMemo(
    (row, field) => {
      console.log(row);
      return products.map((elm) => {
        return {
          id: elm._id,
          product: elm.product_name,
          quantity: elm.quatity,
          price: elm.price,
        };
      });
    },
    [products]
  );

  // Box style
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

  React.useEffect(() => {
    // Get the products from the Backend

    axios
      .get("http://localhost:5001/v1/products")
      .then((resp) => {
        const data = resp.data.data;

        console.log(resp);

        setProducts(data);
        toast.success("nadi");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        return setProducts([]);
      });
  }, []);

  // Handle inputs change

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit function

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
  };
  // Grid table columns config

  const columns = React.useMemo(() => {
    return [
      ...tableFields,
      {
        field: "edit",
        headerName: "Edit",
        sortable: false,
        width: 150,
        renderCell: ({ row, field }) => (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen(row)}
            >
              Open modal
            </Button>
          </div>
        ),
      },

      {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        width: 150,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleButtonClick(params.row)}
          >
            Action
          </Button>
        ),
      },
    ];
  }, []);

  const CustomToolbar = () => (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="h6">Product List</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary">
          Custom Button
        </Button>
      </Grid>
    </Grid>
  );

  // Edit Model use state and open vs close functions

  const [open, setOpen] = React.useState(false);
  const handleOpen = (row) => {
    console.log(row);
    setOpen(true);
    setData(row);
  };
  const handleClose = () => setOpen(false);

  // Row Grid table config
  return (
    <div
      style={{ height: 400, width: "93%", backgroundColor: "#0b2f3a94" }}
      className="mt-10 ms-10"
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="product"
                  variant="outlined"
                  onChange={handleChange}
                  value={data.product}
                  // Add any additional props or event handlers as needed
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Short description"
                  variant="outlined"
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Long description"
                  variant="outlined"
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={data.quantity}
                  variant="outlined"
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={data.price}
                  variant="outlined"
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Discount price"
                  type="number"
                  variant="outlined"
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="sku"
                  variant="outlined"
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <DataGrid
        style={{ color: "#A4A4A4" }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
