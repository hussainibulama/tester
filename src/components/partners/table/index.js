import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/styles";

const columns = [
  {
    field: "title",
    headerName: "Title",
    width: 250,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "category",
    headerName: "Category",
    width: 250,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "addedDate",
    headerName: "Added Date",
    type: "date",
    width: 250,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "desc",
    headerName: "Description",
    sortable: false,
    width: 400,
    headerClassName: "super-app-theme--header",
    renderCell: (data) => {
      return <div dangerouslySetInnerHTML={{ __html: data.value }}></div>;
    },
  },
];

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-toolbarContainer": {
      borderBottom: "16px solid #E5E5E5",
      padding: "10px",
      display: "block",
    },
    "& .MuiButton-textPrimary": {
      color: "#1D1B1B",
    },
    "& .super-app-theme--header": {
      backgroundColor: "#1D1B1B",
      color: "white",
    },
    "& .MuiDataGrid-columnHeaderWrapper": {
      backgroundColor: "#1D1B1B",
      color: "white",
    },
    "& .MuiDataGrid-root": {
      backgroundColor: "white",
    },
    "& .super-app.indraft": {
      color: "#1D1B1B8C",
    },
    "& .super-app.published": {
      color: "#029D2E",
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
  },
});

const PartnersTable = ({ loading, rows }) => {
  const [pageSize, setPageSize] = useState(5);
  const classes = useStyles();

  return (
    <div style={{ height: 530, width: "100%" }} className={classes.root}>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
          // NoRowsOverlay: CustomNoRowsOverlay
        }}
        loading={loading}
        rows={rows}
        rowHeight={70}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default PartnersTable;
