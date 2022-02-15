import ReactQuill from "react-quill";
import styles from "./styles.module.css";
import { makeStyles } from "@material-ui/styles";
import country from "../../countries.json";
import state from "../../states.json";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles({
  root: {
    background: "white",

    "& .ql-container": {
      minHeight: "347px",
    },
  },
});

const Form = (props) => {
  const classes = useStyles();

  return (
    <div>
      <form>
        <div className={styles.column1}>
          <div className={styles.title}>
            <input
              name="title"
              onChange={props.onChange}
              placeholder="Job Title"
            />
          </div>
          <div className={styles.location}>
            <select onChange={props.onChange} name="country">
              <option value="" disabled selected hidden>
                Select Country
              </option>
              {country.map((datas,key)=>(
  <option>
  {datas.name}
</option>
              ))}
            
            </select>
            <select onChange={props.onChange} name="city">
              <option value="" disabled selected hidden>
                Select City
              </option>
          
                  {state.map((datas,key)=>(
                <>
                {datas.country_code === props.indexer &&(
                  <option>
                {datas.name}
              </option>
                )}
                
              </>
              ))}
            </select>
          </div>
          <div className={styles.description}>
            <label htmlFor="ReactQuill">Description</label>
            <ReactQuill
              theme="snow"
              name="description"
              className={classes.root}
              value={props.desc1}
              onChange={props.desc}
            ></ReactQuill>
          </div>
          <div className={styles.requirements}>
            <label htmlFor="ReactQuill">Requirements</label>
            <ReactQuill
              theme="snow"
              name="requirements"
              className={classes.root}
              value={props.req1}
              onChange={props.req}
            ></ReactQuill>
          </div>
          <div className={styles.responsibilities}>
            <label htmlFor="ReactQuill">Responsibilities</label>
            <ReactQuill
              theme="snow"
              name="responsibilities"
              className={classes.root}
              value={props.resp1}
              onChange={props.resp}
            ></ReactQuill>
          </div>
          <div className={styles.benefits}>
            <label htmlFor="ReactQuill">What will you get with cloudfift</label>
            <ReactQuill
              theme="snow"
              className={classes.root}
              value={props.ben1}
              name="benefits"
              onChange={props.ben}
            ></ReactQuill>
          </div>
        </div>
        <div className={styles.column2}>
          <div className={styles.type}>
            <select onChange={props.onChange} name="type">
              <option disabled selected hidden>
                Select Type
              </option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Freelance</option>
              <option>Remote</option>
              <option>On Site</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div className={styles.visibility}>
            <label htmlFor="">Career Visibility</label>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "38px", fontWeight: "300" }}>
                <label class={styles.container}>
                  <input
                    type="radio"
                    name="visibility"
                    onChange={props.onChange}
                    value="active"
                    placeholder="Active"
                  />
                  Active
                </label>
              </div>
              <div style={{ fontWeight: "300" }}>
                <label class={styles.container}>
                  <input
                    type="radio"
                    name="visibility"
                    onChange={props.onChange}
                    value="archived"
                    placeholder="Archived"
                  />
                  Archived
                </label>
              </div>
            </div>
          </div>
          <div className={styles.seoSettings}>
            <label htmlFor="">SEO Settings</label>
            <div className={styles.title}>
              <input
                onChange={props.onChange}
                name="seoTitle"
                placeholder="Seo Title"
              />
            </div>
            <div className={styles.slug}>
              <input onChange={props.onChange} name="slug" placeholder="Slug" />
            </div>
            <div className={styles.metaDescription}>
              <textarea
                onChange={props.onChange}
                name="metaDescription"
                placeholder="Meta Description"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
