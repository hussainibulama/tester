import React, { useState } from "react";
import Form from "./form";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import Loader from "../../ui/loader";
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import instance from "../../../utils/axios";

const defaults = {
  title: "",
  seoTitle: "",
  altText: "",
  slug: "",
  metaDesc: "",
};

const CreateCaseStudy = () => {
  const history = useHistory();
  const params = useParams();
  const [publish, setPublish] = useState(false);
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({
    selectedOptions: [],
  });
  const [fields, setFields] = useState({
    ...defaults,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const selectHandler = (selectedOptions) => {
    setSelected({ selectedOptions });
  };

  const resetFields = () => {
    setFields({
      ...defaults,
    });
    setImage([]);
    setSelected(null);
    setDescription(null);
  };

  async function createCaseStudy(data, publish) {
    setLoading(true);

    if (publish) {
      setPublish(true);
    } else {
      setPublish(false);
    }

    if (image.length === 0) {
      setLoading(false);
      return toast.error("Please upload an image!");
    }

    const formData = new FormData();

    formData.append("file", image[0]);

    try {
      const res = await axios({
        method: "POST",
        url: "/gallery",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      axios
        .post("/case-study", {
          ...data,
          galleryId: res.data.message.id,
        })
        .then(() => {
          toast.success("Case Study Added Successfully!");
          resetFields();
          history.push("/CaseStudy");
        })
        .catch((error) => {
          if (error.response.data.message) {
            toast.error(error.response.data.message[0]);
          } else {
            toast.error("This Case Study Exists!");
          }
        });
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }
  async function approve() {
    setLoading(true);
    try {
      let res = await instance.put(
        '/advert/v2/admin/approve-ad/' + params.id + '?platform=web',
      );

      let result = await res.data;
      if (result && result.status === 'success') {
        toast.success("Approve/DiApproved successfully");
        setLoading(false);
        history.go(0);

      }else if (result && result.status === 'error') {
        toast.error(result.message);
        setLoading(false);

      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
      setLoading(false);

    }
  
}
const Setter=(text)=>{
  setStatus(text);
}
  const onSubmit = (publish) => {
    createCaseStudy(
      {
        title: fields.title,
        //   seoTItle: fields.seoTitle,
        //   altText: fields.altText,
        body: description,
        //   slug: fields.slug,
        //   metaDesc: fields.metaDesc,
        // galleryId: 1,
        publishedStatus: publish ? 1 : 0,
        tags: selected.selectedOptions
          ? selected.selectedOptions.map((x) => {
              return x.value;
            })
          : [],
        //   adminId: JSON.parse(localStorage.getItem("userDetails")).uid, // tell chisom
        adminId: 1,
      },
      publish
    );
  };

  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        <h2>View Advert Details</h2>
        <div className={styles.section_header_buttons}>
          {/* <button
            className={styles.section_header_button_draft}
            onClick={() => onSubmit()}
          >
            {loading && !publish && <Loader />}
            Delete
          </button> */}
          <button
            className={styles.section_header_button_publish}
            onClick={() => approve()}
          >
            {loading && <Loader />}
            {status ===true && <>Disapprove</>}
            {status !==true && <>Approve</>}
             
          </button>
        </div>
      </div>
      <div className={styles.section_body}>
        <Form
          image={image}
          setImage={setImage}
          handleInput={handleInputChange}
          fields={fields}
          selectHandler={selectHandler}
          selectedOption={selected ? selected.selectedOptions : null}
          description={description}
          setDescription={setDescription}
          Setter={Setter}
        />
      </div>
    </div>
  );
};

export default CreateCaseStudy;
