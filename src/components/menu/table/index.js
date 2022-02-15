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
    field: "CatId",
    headerName: "Category Id",
    width: 150,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Category Title",
    width: 150,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "slug",
    headerName: "Slug",
    width: 150,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },

  {
    field: "status",
    headerName: "Status",
    width: 150,
    headerClassName: "super-app-theme--header",
    cellClassName: (params) =>
      clsx("super-app", {
        indraft: params.value === "IN_DRAFT",
        active: params.value === "Published",
        archived: params.value === "Archived",
      }),
  },
  {
    field: "Parent",
    headerName: "Parent Page",
    width: 200,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },

  {
    field: "publishedDate",
    headerName: "Published Date",
    type: "date",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
   
];
/*
const rows = [
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
  const classes = useStyles();
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await instance.get("/menu-categories/1/sub-menu");
      let result = await res.data.sub_categories;
      if(result){
        let ar = [];
       await  result.forEach((item,index)=>{
        ar.push({
          id:   item.id,
          CatId:  item.categoryId,
          name: item.name,
          slug: item.slug,
          status: item.status,
          Parent: item.Category.name,
          publishedDate: item.created_at,
        
        });
        });
      console.log(ar);
        if(result.length===ar.length){
          setItems(ar);

        }
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
