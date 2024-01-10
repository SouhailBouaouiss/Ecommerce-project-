export const tableFields = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "product_name", headerName: "Product", width: 200 },
  { field: "quantity", headerName: "Quantity", type: "number", width: 120 },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 150,
  },
];

export const customerTableFields = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "first_name", headerName: "first_name", width: 100 },
  { field: "last_name", headerName: "last_name", width: 100 },
  {
    field: "email",
    headerName: "Email",

    width: 250,
  },
  {
    field: "last_login",
    headerName: "last_login",

    width: 250,
  },
  {
    field: "status",
    headerName: "status",
    width: 100,
  },
];

export const userTableFields = [
  { field: "id", headerName: "ID", width: 240 },
  { field: "first_name", headerName: "First Name", width: 130 },
  { field: "last_name", headerName: "Last Name", width: 130 },
  { field: "role", headerName: "Role", width: 130 },
  { field: "creation_date", headerName: "Date of Registration", width: 360 },
];

export const orderTableFields = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "customer_id", headerName: "customer_id", width: 250 },
  { field: "order_date", headerName: "order_date", width: 200 },

  {
    field: "status",
    headerName: "status",
    width: 200,
  },
];
