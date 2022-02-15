import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CustomModal from "../../ui/modal";
import CustomTableFooter from "../../ui/tableFooter";

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

const CareersTable = ({
  loading,
  rows,
  setIndexes,
  deleteItems,
  indexes,
  clearIndexes,
  openEditModal,
  setSelectionModel,
  selectionModel,
  block,
  unblock,
  deletes
}) => {
  const [pageSize, setPageSize] = useState(5);
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [disableBtn, setDisableBtn] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    clearIndexes();
  };

  const handleClick = (event, params) => {
    setAnchorEl(event.currentTarget);
    setIndexes([params.row.id]);
    setDisableBtn(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      field: "username",
      headerName: "Username",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "type",
      headerName: "User Type",
      width: 150,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "phone",
      headerName: "Phone Number",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "coins",
      headerName: "User Coins",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "verify",
      headerName: "Contact Ver. Status",
      width: 150,
      headerClassName: "super-app-theme--header",
      cellClassName: (params) =>
      clsx("super-app", {
        indraft: params.value === "False",
        active: params.value === "True",
        // archived: params.value === "Archived",
      }),
    },
    {
      field: "board",
      headerName: "User Unboard Status",
      width: 150,
      headerClassName: "super-app-theme--header",
      cellClassName: (params) =>
      clsx("super-app", {
        indraft: params.value === "False",
        active: params.value === "True",
        // archived: params.value === "Archived",
      }),
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "super-app-theme--header",
      cellClassName: (params) =>
        clsx("super-app", {
          indraft: params.value === "False",
          active: params.value === "True",
          // archived: params.value === "Archived",
        }),
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      headerClassName: "super-app-theme--header",
      align: "left",
      renderCell: (params) => {
        return (
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params)}
            >
              <MoreHorizIcon style={{ color: "#1D1B1B" }} />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "20ch",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  openEditModal(indexes[0]);
                  handleClose();
                }}
              >
                View User Transactions
              </MenuItem>
              <MenuItem
                 onClick={() => {
                  block(selectionModel[0]);
                  handleClose();
                }}
              >
                Block User
              </MenuItem>
              <MenuItem
                  onClick={() => {
                    unblock(selectionModel[0]);
                    handleClose();
                  }}
              >
                Un-Block User
              </MenuItem>
              <MenuItem
                   onClick={() => {
                    deletes(selectionModel[0]);
                    handleClose();
                  }}
              >
                Delete User
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ height: 530, width: "100%" }} className={classes.root}>
        <DataGrid
          components={{
            Toolbar: GridToolbar,
          }}
          rows={rows}
          rowHeight={70}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[100, 200]}
          pagination
          checkboxSelection
          // disableSelectionOnClick
          loading={loading}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </div>

      <CustomTableFooter
        disabled={!disableBtn || indexes?.length === 0}
        clicked={() => {
          setShowModal(true);
        }}
      />

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
};

export default CareersTable;
