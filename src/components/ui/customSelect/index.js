import React from "react";
import Select from "react-select";
import "./styles.scss";

const CustomSelect = ({ data, name, ...props }) => {
  return (
    <>
      <Select
        // defaultValue={[colourOptions[2], colourOptions[3]]}
        // isMulti
        name={name}
        options={data}
        className="basic-multi-select"
        classNamePrefix="select"
        {...props}
      />
    </>
  );
};

export default CustomSelect;
