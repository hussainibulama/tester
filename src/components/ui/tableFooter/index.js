import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const CustomTableFooter = ({ clicked, ...props }) => {
  return (
    <div className="custom-table-delete">
      <button onClick={clicked} {...props}>
        Delete <DeleteIcon />
      </button>
    </div>
  );
};

export default CustomTableFooter;
