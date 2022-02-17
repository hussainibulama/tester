import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const CustomTableFooters = ({ clicked, ...props }) => {
  return (
    <div className="custom-table-delete">
      <button style={props.style}onClick={clicked} {...props}>
        {props.name}
      </button>
    </div>
  );
};

export default CustomTableFooters;
