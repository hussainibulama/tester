import "./styles.scss";
import CareersTable from "./table";
import { useState } from "react";
import Add from "./add.js";

const Careers = () => {
    const [modals, setModals] = useState(false);
  
   async function start(){
       console.log("okk")
    setModals(true);
   }
    return ( 
        <div className="section">
            <div className="section_header">
                <h2>Menu Category</h2>
                <button  onClick={()=>start()} className="section_header_button">Add New</button>
            </div>
            {modals===true &&  <Add   displayModal={modals}
              closeModal={()=>setModals(false)} />}
          
            <div className="section_body">
                <CareersTable /> 
            </div>
            
        </div>
     );
}
 
export default Careers;