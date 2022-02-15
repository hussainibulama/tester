import { NavLink } from "react-router-dom";
import "./styles.scss";
import ServicesTable from "./table";

const ServicesPage = () => {
  return (
    <div className="section">
      <div className="section_header">
        <h2>Services</h2>
        <NavLink
          to="/Services/Create-Service"
          className="section_header_button"
        >
          Add New
        </NavLink>
      </div>
      <div className="section_body">
        <ServicesTable />
      </div>
    </div>
  );
};

export default ServicesPage;
