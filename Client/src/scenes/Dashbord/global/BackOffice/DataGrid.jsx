import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ rows, columns }) {
  return (
    <div style={{ height: 500, marginTop: 20 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination={false}
        style={{ color: "white", borderColor: "rgb(25, 28, 36)" }}
      />
    </div>
  );
}
