import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import {
  Button,
  Grid,
  Typography,
  TextField,
  colors,
  IconButton,
} from "@mui/material";
import { tableFields } from "../util";
import { axiosInstance } from "../api";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import DeleteModel from "../scenes/Dashbord/global/BackOffice/DeleteModel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export default function Product() {
  //Creat a state for products

  const [products, setProducts] = React.useState([]);

  const [openDelete, setOpenDelete] = React.useState(false);
  // Creat a state for the passing product to Edit in the modal

  const [productToEdit, setProductToEdit] = React.useState({
    id: null,
    product_name: null,
    quantity: null,
    price: null,
    sku: null,
    short_description: null,
    long_description: null,
  });

  // Creat a useState to stock subcategories

  const [subcategories, setSubcategories] = React.useState([]);

  // Retrieve the subcategories from the backEnd

  React.useEffect(() => {
    axiosInstance
      .get("/v1/subcategories")
      .then((resp) => {
        const data = resp.data.data;

        setSubcategories(data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        return setSubcategories([]);
      });
  }, []);

  // Transform the product data from the useState to a format that fites the DataGrid and stock
  //in the useMemo

  const rows = React.useMemo(() => {
    return products.map((elm) => {
      return {
        ...elm,
        id: elm._id,
      };
    });
  }, [products]);

  // Box styling

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
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  };

  // Get the products from the Backend
  React.useEffect(() => {
    axiosInstance
      .get("/v1/products")
      .then((resp) => {
        const data = resp.data.data;
        console.log(resp);

        setProducts(data);
        toast.success("Products fetched successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        return setProducts([]);
      });
  }, []);

  // Handle inputs change

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductToEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit function

  const handleSubmitEdit = (event) => {
    event.preventDefault();

    axiosInstance
      .put(`/v1/products/${productToEdit.id}`, productToEdit)
      .then((resp) => {
        const data = resp.data.data;
        console.log(data);
        setProducts((prev) => {
          return prev.map((elm) => {
            console.log(elm._id, data._id);
            if (elm._id == data._id) {
              console.log(elm, "found", elm, data._id);
              return data;
            } else {
              return elm;
            }
          });
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
        console.error(error);
      });
    setOpen(false);
  };
  const handleDeleteClick = (row) => {
    setOpenDelete(true);
    setProductToEdit(row);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setProductToEdit({});
  };
  // Haandle delete click

  const handleDelete = () => {
    const productToDeleteId = productToEdit.id;

    axiosInstance
      .delete(`/v1/products/${productToDeleteId}`)
      .then((resp) => {
        const message = resp.data.message;
        console.log(message);
        console.log(resp);
        toast.warning(message);
        setProducts((prev) => {
          return prev.filter((elm) => {
            console.log(elm._id, productToDeleteId);
            return elm._id !== productToDeleteId;
          });
        });
        setOpenDelete(false);
        setProductToEdit({});
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
        console.error(error);
      });
  };
  // Grid table columns config

  const columns = React.useMemo(() => {
    return [
      ...tableFields,
      {
        field: "actions",
        headerName: "Actions",
        width: 160,
        renderCell: ({ row, field }) => (
          <div>
            <IconButton
              variant="contained"
              color="info"
              onClick={() => handleOpen(row)}
            >
              <EditIcon color="info" fontSize="small" />
            </IconButton>
            <IconButton
              variant="contained"
              color="error"
              onClick={() => handleDeleteClick(row)}
            >
              <DeleteForeverIcon color="error" fontSize="small" />
            </IconButton>
          </div>
        ),
      },
    ];
  }, []);

  // Handle adding a new product

  // Handle the select change
  const [productImg, setProductImg] = React.useState({});

  const handleAddProduct = (event) => {
    axiosInstance
      .post(
        "/v1/products",
        { ...getValues(), file: productImg },
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
          origin: "http://localhost:5001",
        }
      )
      .then((resp) => {
        console.log(resp);
        const data = resp.data.data;
        console.log(resp.data);
        toast.success();

        setProducts((prev) => {
          return [...prev, data];
        });
      });
    setOpenAdd(false);
  };

  // Select input style
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // Upload button style

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  // Handle input change for adding new Product

  const { register, handleSubmit, getValues } = useForm();
  // This is the function that returns the toolUpBar

  const CustomToolbar = () => (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="overline" fontSize={20} lineHeight={1}>
          Product List
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="text"
          color="info"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          size="small"
          sx={{ color: "#2196f3 !important" }}
        >
          Add Product
        </Button>
        <Modal
          open={openAdd}
          onClose={handleCloseAdd}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit(handleAddProduct)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    // name="product_name"
                    variant="outlined"
                    {...register("product_name")}

                    // Add any additional props or event handlers as needed
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">
                      Subcategory
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      // multiple
                      {...register("subcategory_id")}

                      // input={<OutlinedInput label="Name" />}
                      // MenuProps={MenuProps}
                    >
                      {subcategories.map((elm) => (
                        <MenuItem value={elm._id} key={elm._id}>
                          {elm.subcategory_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      //   value={productImg}
                      onChange={({ target }) => setProductImg(target.files[0])}
                      type="file"
                    />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Short description"
                    variant="outlined"
                    name="short_description"
                    {...register("short_description")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Long description"
                    variant="outlined"
                    name="long_description"
                    {...register("long_description")}

                    // Add any additional props or event handlers as needed
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    name="quantity"
                    variant="outlined"
                    {...register("quantity")}
                    // Add any additional props or event handlers as needed
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    name="price"
                    variant="outlined"
                    {...register("price")}
                    // Add any additional props or event handlers as needed
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Discount price"
                    type="number"
                    variant="outlined"
                    name="discount_price"
                    {...register("discount_price")}

                    // Add any additional props or event handlers as needed
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="sku"
                    variant="outlined"
                    name="sku"
                    {...register("sku")}

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
      </Grid>
    </Grid>
  );

  // Edit Model use state and open vs close functions

  const [open, setOpen] = React.useState(false);
  const handleOpen = (row) => {
    setOpen(true);
    setProductToEdit(row);
  };
  const handleCloseAdd = () => setOpenAdd(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = (row) => {
    setOpenAdd(true);
  };
  const handleClose = () => setOpen(false);

  // Row Grid table config
  return (
    <div
      style={{
        width: "93%",
        maxWidth: "1190px",
        backgroundColor: "rgb(25, 28, 36)",
        color: "white",
        position: "absolute",
        top: "42%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: 500,
        marginTop: 20,
        border: "none",
      }}
      className="p-4 mt-10"
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmitEdit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="product_name"
                  variant="outlined"
                  onChange={handleChange}
                  value={productToEdit.product_name}
                  // Add any additional props or event handlers as needed
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Short description"
                  variant="outlined"
                  name="short_description"
                  onChange={handleChange}
                  value={productToEdit.short_description}
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Long description"
                  variant="outlined"
                  name="long_description"
                  onChange={handleChange}
                  value={productToEdit.long_description}
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={productToEdit.quantity}
                  name="quantity"
                  variant="outlined"
                  onChange={handleChange}
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  name="price"
                  value={productToEdit.price}
                  variant="outlined"
                  onChange={handleChange}
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Discount price"
                  type="number"
                  variant="outlined"
                  name="discount_price"
                  onChange={handleChange}
                  value={productToEdit.discount_price}
                  // Add any additional props or event handlers as needed
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="sku"
                  variant="outlined"
                  name="sku"
                  onChange={handleChange}
                  value={productToEdit.sku}
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
        style={{ color: "white", border: "0", height: "100%" }}
        rows={rows}
        columns={columns}
        pagination={false}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      <DeleteModel
        fn={handleDelete}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
    </div>
  );
}
