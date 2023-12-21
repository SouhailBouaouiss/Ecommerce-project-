export const tableFields = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "product_name", headerName: "Product", width: 130 },
  { field: "quantity", headerName: "Quantity", type: "number", width: 130 },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 150,
  },
];

export const customerTableFields = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "first_name", headerName: "first_name", width: 120 },
  { field: "last_name", headerName: "last_name", width: 120 },
  {
    field: "email",
    headerName: "Email",

    width: 120,
  },
  {
    field: "last_login",
    headerName: "last_login",

    width: 120,
  },
  {
    field: "status",
    headerName: "status",
    width: 150,
  },
];

export const userTableFields = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "first_name", headerName: "First Name", width: 130 },
  { field: "last_name", headerName: "Last Name", width: 130 },
  { field: "role", headerName: "Role", with: 130 },
  { field: "creation_date", headerName: "Date of Registration", with: 200 },
];

export const orderTableFields = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "customer_id", headerName: "customer_id", width: 250 },
  { field: "order_date", headerName: "order_date", width: 130 },

  {
    field: "status",
    headerName: "status",
    width: 120,
  },
];
