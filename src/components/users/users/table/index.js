/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CustomModal from "../../../ui/modal";
import CustomTableFooters from "../../../ui/tableFooter/prev";

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

const TransactionsTable = ({ 
  loading,
  rows,
  setIndexes,
  deleteItems,
  indexes,
  clearIndexes,
  toggleStatus,
  setSelectionModel,
  selectionModel,
  next,
  prev
  
   }) => {

    const [pageSize, setPageSize] = useState(5);
    const classes = useStyles();
    const [showModal, setShowModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const closeModal = () => {
      setShowModal(false);
      clearIndexes();
    };

    const handleClick = (event, params) => {
      setAnchorEl(event.currentTarget);
      setIndexes([params.row.id]);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const columns = [
      { 
          field: 'user_id', 
          headerName: 'User ID', 
          width: 250 ,
          editable: true,
          headerClassName: 'super-app-theme--header',
      },
      { 
        field: 'amount', 
        headerName: 'Amount', 
        width: 150 ,
        editable: true,
        headerClassName: 'super-app-theme--header',
    },
    { 
      field: 'new_balance', 
      headerName: 'New Balance', 
      width: 150 ,
      editable: true,
      headerClassName: 'super-app-theme--header',
  },
  { 
    field: 'previous_balance', 
    headerName: 'Prev Balance', 
    width: 150 ,
    editable: true,
    headerClassName: 'super-app-theme--header',
},
{ 
  field: 'product_category', 
  headerName: 'Category', 
  width: 150 ,
  editable: true,
  headerClassName: 'super-app-theme--header',
},
{ 
  field: 'transaction_id', 
  headerName: 'Transaction Id', 
  width: 150 ,
  editable: true,
  headerClassName: 'super-app-theme--header',
},
{ 
  field: 'created_at', 
  headerName: 'Date', 
  width: 300 ,
  editable: true,
  headerClassName: 'super-app-theme--header',
},
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        editable: true,
        headerClassName: 'super-app-theme--header',
        cellClassName: (params) =>
        clsx('super-app', {
          indraft: params.value === 'False',
          published: params.value === 'True',
        }),
      },
      { 
        field: 'type', 
        headerName: 'Type', 
        width: 150 ,
        editable: true,
        headerClassName: 'super-app-theme--header',
      },
     
    ];
    
    return ( 
      <>
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
              //disableSelectionOnClick
              loading={loading}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
          />
        </div>
       
  

        <CustomModal open={showModal} close={closeModal} size="small">
          <div className="delete-dialog">
            <div className="delete-dialog__header">
              <h4>Are you sure you want to delete?</h4>
            </div>

            <div className="delete-dialog__actions">
              <button
                className="delete-btn"
                onClick={() => {
                  deleteItems(indexes);
                  closeModal();
                }}
              >
                Confirm
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </CustomModal>
      </>
     );
}
 
export default TransactionsTable;