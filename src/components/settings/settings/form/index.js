import { DropzoneArea } from "material-ui-dropzone";
import styles from "./styles.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelect from "../../../ui/customSelect";
import { tags } from "../../../../utils/tags";
import CkEditor from "../../../ui/ckeditor";

const useStyles = makeStyles({
  root: {
    background: "white",
    marginBottom: "24px",
    padding: "24px",
    "& .MuiDropzoneArea-root": {
      height: "269px",
      // display: "flex",
      background: "#F8F7F7",
      marginBottom: "24px",
    },
    "& .MuiDropzoneArea-textContainer": {
      padding: "10px",
      alignItems: "center",
      justifyContent: "center",
    },
    "& .MuiDropzonePreviewList-image": {
      width: "auto",
      maxWidth: "80px",
      height: "auto",
      objectFit: "cover",
    },
  },
  myEditingArea: {
    minHeight: "347px",
  },
});

const Form = ({
  body,
  setBody,
  fields,
  handleInput,
  selectHandler,
  selectedOption,
  image,
  setImage,
}) => {

  const classes = useStyles();
  return (
    <div>
      <form>
        <div className={styles.column1}>
          <div className={styles.title}>
            <input 
              type="text"
              name="email"
              value={fields.name}
              onChange={handleInput}
              placeholder="Email" 
              />
          </div>
          <div className={styles.title}>
            <input 
              type="password"
              name="password"
              value={fields.name}
              onChange={handleInput}
              placeholder="Password" 
              />
          </div>
          <div className={styles.title}>
            <input 
              type="text"
              name="username"
              value={fields.name}
              onChange={handleInput}
              placeholder="Username" 
              />
          </div>
       
        
        </div>
        <div className={styles.column2}>
          <div className={styles.seoSettings}>
            <label htmlFor="">Role</label>
            <div className={styles.title}>
              <input 
                placeholder="Role e.g admin,support,super"
                type="text"
                name="role"
                value={fields.name}
                onChange={handleInput}
              />
            </div>
        
        
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
