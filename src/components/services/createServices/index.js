import { NavLink } from "react-router-dom";
import Form from "./form";
import styles from './styles.module.css';

const CreateServices = () => {
    return ( 
        <div className={styles.section}>
            <div className={styles.section_header}>
                <h2>Create Service</h2>
                <div className={styles.section_header_buttons}>
                    <NavLink to="" className={styles.section_header_button_draft}>Save as Draft</NavLink>
                    <NavLink to="" className={styles.section_header_button_publish}>Publish</NavLink>
                </div>
            </div>
            <div className={styles.section_body}>
                <Form /> 
            </div>
            
        </div>
     );
}
 
export default CreateServices;