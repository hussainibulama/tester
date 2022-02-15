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
              name="title"
              value={fields.name}
              onChange={handleInput}
              placeholder="Inisght Title" 
              />
          </div>
          <div className={styles.description}>
            <label>Body</label>

            <div className={classes.myEditingArea}>
              <CkEditor
                data={body}
                handleRichText={(data) => {
                  setBody(data);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.column2}>
          <div className={styles.category}>
            <CustomSelect
              placeholder="Select Category"
              data={tags}
              isMulti
              name="tags"
              value={selectedOption}
              onChange={selectHandler}
            />
          </div>
          <div className={classes.root}>
            <label htmlFor="DropzoneArea">Settings</label>
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
          <div className={styles.seoSettings}>
            <label htmlFor="">SEO Settings</label>
            <div className={styles.title}>
              <input 
                placeholder="Seo Title"
                type="text"
                name="seoTitle"
                value={fields.seoTitle}
                onChange={handleInput}
              />
            </div>
            <div className={styles.slug}>
              <input 
                placeholder="Slug"
                type="text"
                name="slug"
                value={fields.slug}
                onChange={handleInput}
              />
            </div>
            <div className={styles.metaDescription}>
              <textarea 
                value={fields.metaDesc}
                placeholder="Meta Description"
                onChange={handleInput}
                name="metaDesc"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
