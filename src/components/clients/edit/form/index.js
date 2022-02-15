import { DropzoneArea } from "material-ui-dropzone";
import styles from "./styles.module.css";
import { makeStyles } from "@material-ui/styles";
import CkEditor from "../../../ui/ckeditor";

const useStyles = makeStyles({
  root: {
    background: "white",
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
  description,
  setDescription,
  fields,
  handleInput,
  image,
  setImage,
  categories,
}) => {
  const classes = useStyles();

  return (
    <div>
      <form>
        <div className={styles.column1}>
          <div className={styles.name}>
            <input
              placeholder="Client name"
              type="text"
              name="name"
              value={fields.name}
              onChange={handleInput}
            />
          </div>
          <div className={styles.description}>
            <label htmlFor="ReactQuill">Description</label>
            <div className={classes.myEditingArea}>
              <CkEditor
                data={description}
                handleRichText={(data) => {
                  setDescription(data);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.column2}>
          <div className={styles.category}>
            <select
              placeholder="Client name"
              value={fields.category}
              onChange={handleInput}
              name="category"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((x) => {
                return (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.root}>
            <label htmlFor="DropzoneArea">Client Logo</label>
            <DropzoneArea
              onChange={setImage}
              value={image}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              maxFileSize={5000000}
              filesLimit={1}
            />
            <div className={styles.imageAlt}>
              <input
                placeholder="Image alt text"
                type="text"
                name="altText"
                value={fields.altText}
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
