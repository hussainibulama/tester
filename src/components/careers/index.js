import { NavLink } from "react-router-dom";
import "./styles.scss";
import CareersTable from "./table";

const Careers = () => {
    return ( 
        <div className="section">
            <div className="section_header">
                <h2>Careers</h2>
                <NavLink to="/Careers/New-Career" className="section_header_button">Add New</NavLink>
            </div>
            <div className="section_body">
                <CareersTable /> 
            </div>
            
        </div>
     );
}
 
export default Careers;