import { DataGrid,GridToolbar } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useState } from 'react';

const columns = [
    { field: 'id', headerName: 'ID', width: 90, headerClassName: 'super-app-theme--header', headerAlign: 'center', },
    { 
        field: 'title', 
        headerName: 'Title', 
        width: 200 ,
        editable: true,
        headerClassName: 'super-app-theme--header',
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 200,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      editable: true,
      headerClassName: 'super-app-theme--header',
      cellClassName: (params) =>
      clsx('super-app', {
        indraft: params.value === 'In Draft',
        published: params.value === 'Published',
      }),
    },
    {
      field: 'pageHits',
      headerName: 'Page Hits',
      sortable: false,
      type: 'number',
      width: 200,
      headerClassName: 'super-app-theme--header',
    },
  ];
  
  const rows = [
    { id: 1, title: 'Product Design', category: 'Consultancy', status: 'Published', pageHits: 24 },
    { id: 2, title: 'Web App Development', category: 'Engineering', status: 'In Draft', pageHits: 2504 },
    { id: 3, title: 'Mobile App Development', category: 'Consultancy', status: 'Published', pageHits: 108 },
    { id: 4, title: 'Cloud Security', category: 'Engineering', status: 'Published', pageHits: 10 },
    { id: 5, title: 'Product Management', category: 'Consultancy', status: 'Published', pageHits: 200 },
  ];
  const useStyles = makeStyles({
    root: {
      '& .MuiDataGrid-toolbarContainer': {
        borderBottom: '16px solid #E5E5E5',
        padding: '10px',
        display: 'block',
      },
      '& .MuiButton-textPrimary': {
        color: '#1D1B1B',
      },
      '& .super-app-theme--header': {
        backgroundColor: '#1D1B1B',
        color: 'white',
      },
      '& .MuiDataGrid-columnHeaderWrapper': {
        backgroundColor: '#1D1B1B',
        color: 'white',
      },
      '& .MuiDataGrid-root': {
        backgroundColor: 'white',
      },
      '& .super-app.indraft': {
        color: '#1D1B1B8C',
      },
      '& .super-app.published': {
        color: '#029D2E',
      },
      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
    },
  });

const ServicesTable = () => {

    const [pageSize, setPageSize] = useState(5);
    const classes = useStyles();
    return ( 
        <div style={{ height: 530, width: '100%' }} className={classes.root}>
            <DataGrid
                components={{
                    Toolbar: GridToolbar,
                    }}
                rows={rows}
                rowHeight={70}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                checkboxSelection
                // disableSelectionOnClick
                
            />
        </div>
     );
}
 
export default ServicesTable;