import { useState } from "react";

import Form from "./form";
import styles from "./styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import instance from "../../../utils/axios";
import country from "../countries.json";
import 'react-toastify/dist/ReactToastify.css';
const CreateCareers = () => {
  const [inputValues, setInputValues] = useState({
    title: "",
    visibility: "",
    type: "",
    country: "",
    city: "",
    
    seoTitle: "",
    slug: "",
    metaDescription: "",
  });
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [benefits, setBenefits] = useState("");
  const [Loading, setLoading] = useState(false);
  const [indexer, setIndexer] = useState();
  const [Major, setMajor] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    if(name==="country"){
      let Ind= country.findIndex(x=>x.name===value);
      setIndexer(country[Ind].iso2);
    }
  };
  async function Add() {
    if(inputValues.title !=="" &&
     inputValues.visibility !=="" && 
     inputValues.type  !==""&&
     inputValues.country !=="" &&
     inputValues.city !=="" &&
     inputValues.seoTitle !=="" &&
     inputValues.slug !=="" &&
     inputValues.metaDescription !=="" &&
     description !=="" && 
     requirements  !=="" && 
     responsibilities !=="" &&
    benefits !==""){
    try {
      let res = await instance.post("/career/add", {
        title: inputValues.title,
        visibility: inputValues.visibility,
        type: inputValues.type,
        country: inputValues.country,
        city: inputValues.city,
        status: Major ==="draft" ?0:1,
        seoTitle: inputValues.seoTitle,
        slug: inputValues.slug,
        metaDescription: "",
        description: description,
        responsibilities: responsibilities,
        requirements: requirements,
        benefits: benefits,
      });
      let result = await res.data;
      if (result.statusCode === 200) {
    setLoading(false);
        toast.success(JSON.stringify(result.message), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setDescription("");
        setRequirements("");
        setResponsibilities("");
        setBenefits("");
        setInputValues({
          title: "",
          visibility: "",
          type: "",
          country: "",
          city: "",
          status: 1,
          seoTitle: "",
          slug: "",
          metaDescription: "",
        });
      } else {
    setLoading(false);
        toast.success(
          JSON.stringify(String(result.message)),
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setDescription("");
        setRequirements("");
        setResponsibilities("");
        setBenefits("");
        setInputValues({
          title: "",
          visibility: "",
          type: "",
          country: "",
          city: "",
          status: 1,
          seoTitle: "",
          slug: "",
          metaDescription: "",
        });
 

      }
    } catch (error) {
      let res = error.response.data.message;
      let response = String(res);
    setLoading(false);
      toast.error(JSON.stringify(String(response)), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  

    }
  }else{
    toast.error("Please fill out all fields", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setLoading(false);

  }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setMajor("online");
    setLoading(true);
    Add();
  };
  const onSubmits = (e) => {
    e.preventDefault();
    setMajor("draft");
    setLoading(true);
    Add();
  };
  return (
    <div>
      <ToastContainer />
      <div className={styles.section}>
        <div className={styles.section_header}>
          <h2>New Career</h2>
          <div className={styles.section_header_buttons}>
            <button   onClick={onSubmits} disabled={Loading?true:false} className={styles.section_header_button_draft}>
              Save as Draft
            </button>
            <button
              onClick={onSubmit}
              disabled={Loading?true:false}
              style={{ cursor: "pointer" }}
              className={styles.section_header_button_publish}
            >
              Publish
            </button>
          </div>
        </div>
        <div className={styles.section_body}>
          <Form
            onChange={handleChange}
            resp={setResponsibilities}
            resp1={responsibilities}
            ben={setBenefits}
            ben1={benefits}
            desc={setDescription}
            desc1={description}
            req={setRequirements}
            req1={requirements}
            indexer={indexer}
            
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCareers;
