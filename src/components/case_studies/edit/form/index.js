import styles from "./styles.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelect from "../../../ui/customSelect";
import { tags } from "../../../../utils/tags";
import CkEditor from "../../../ui/ckeditor";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles({
  root: {
    background: "white",
    padding: "24px",
    "& .MuiDropzoneArea-root": {
      height: "269px",
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
  fields,
  handleInput,
  selectHandler,
  selectedOption,
  description,
  setDescription,
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
              placeholder="Case Study Title"
              value={fields.title}
              onChange={handleInput}
              name="title"
              type="text"
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
                value={fields.altText}
                onChange={handleInput}
                name="altText"
                type="text"
              />
            </div>
          </div>
          <div className={styles.seoSettings}>
            <label htmlFor="">SEO Settings</label>
            <div className={styles.title}>
              <input
                placeholder="Seo Title"
                value={fields.seoTitle}
                onChange={handleInput}
                name="seoTitle"
                type="text"
              />
            </div>
            <div className={styles.slug}>
              <input
                placeholder="Slug"
                value={fields.slug}
                onChange={handleInput}
                name="slug"
                type="text"
              />
            </div>
            <div className={styles.metaDescription}>
              <textarea
                placeholder="Meta Description"
                value={fields.metaDesc}
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
