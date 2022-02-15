import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { useState, useEffect } from "react";
import instance from "../../../utils/axios";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    headerClassName: "super-app-theme--header",
    cellClassName: (params) =>
      clsx("super-app", {
        indraft: params.value === "In Draft",
        active: params.value === "Active",
        archived: params.value === "Archived",
      }),
  },
  {
    field: "publishedDate",
    headerName: "Published Date",
    type: "date",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "location",
    headerName: "Location",
    width: 200,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "type",
    headerName: "Type",
    width: 200,
    headerClassName: "super-app-theme--header",
  },
];

/*const rows = [
  {
    id: 1,
    title: "UI/UX Designer",
    status: "Active",
    publishedDate: "June 24, 2021",
    location: "Lagos",
    type: "Remote",
  },
  {
    id: 2,
    title: "Data Analyst",
    status: "In Draft",
    publishedDate: "June 24, 2021",
    location: "U.S.A",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Content Writer",
    status: "Archived",
    publishedDate: "June 24, 2021",
    location: "Abuja",
    type: "Contract",
  },
  {
    id: 4,
    title: "Business Developer",
    status: "Active",
    publishedDate: "June 24, 2021",
    location: "India",
    type: "Freelance",
  },
  {
    id: 5,
    title: "Software Engineer",
    status: "Archived",
    publishedDate: "June 24, 2021",
    location: "Korea",
    type: "Remote",
  },
];
*/
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
    "& .super-app.active": {
      color: "#029D2E",
    },
    "& .super-app.archived": {
      color: "#F90E0E",
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
  },
});

const CareersTable = () => {
  const [pageSize, setPageSize] = useState(5);
  const [items, setItems] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      let res = await instance.get("/career");
      let result = await res.data;
      if(result){
        let ar = [];
        let counter = 1;
        result.message.allCareers.forEach((item,index)=>{
          let q= {
            id: counter,
            title: item.title,
            status: item.status===1?"Active":"Draft",
            publishedDate: item.createdAt,
            location: item.city + " "+ item.country,
            type: item.type,
          }
          counter++;
          ar.push(q);
        })
        setItems(ar);
      }
      
      if (result.statusCode === 200) {
        console.log("a");
      }
    })();
  },[]);
  return (
    <div style={{ height: 530, width: "100%" }} className={classes.root}>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        rows={items}
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

export default CareersTable;
