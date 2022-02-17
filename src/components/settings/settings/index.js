/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Form from "./form";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import Loader from "../../ui/loader";
import { useHistory } from "react-router";
import instance from "../../../utils/axios";

const defaults = {
  email: "",
  password: "",
  username: "",
  role: "",

};

const CreateSettings = () => {
  const history = useHistory();
  const [publish, setPublish] = useState(false);
  const [body, setBody] = useState("");
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
    setBody(null);
  };

  async function FAQ(data, publish) {
    setLoading(true);
    if (publish) {
      setPublish(true);
    } else {
      setPublish(false);
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
        .post("/insights", {
          ...data,
          galleryId: res.data.message.id,
        })
        .then(() => {
          toast.success("Insight Published Successfully!");
          resetFields();
          history.push("/Insights");
        })
        .catch((error) => {
          if (error.response.data.message) {
            toast.error(error.response.data.message[0]);
          } else {
            toast.error("This Insight Exists!");
          }
        });
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }
  async function addFaq() {
    setLoading(true);
    try {
      const res = await instance.post(`/admin/v2/sign-up?platform=web`,[{
        email: fields.email,
        password: fields.password,
        username:fields.username,
        role: fields.role,
        can_write: "true",
      }]);
      let result = await res.data;
      if(result.status==="success"){
           toast.success("User Added Successfully!");
          history.push("/Settings");
      }else{
        toast.error(result.message);
      } 
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }
  const onSubmit = (publish) => {
    CreateSettings(
      {
        subject: fields.subject,
        question: fields.question,
        answer: body,
        asked_by: fields.asked_by,
        added_by: fields.added_by,
      },
      publish
    );
  };
  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        <h2>Create User</h2>
        <div className={styles.section_header_buttons}>
       
          <button
            className={styles.section_header_button_publish}
            onClick={() => addFaq()}
          >
            {loading && publish && <Loader />}
            Save
          </button>
        </div>
      </div>
      <div className={styles.section_body}>
        <Form 
          body={body}
          setBody={setBody}
          image={image}
          setImage={setImage}
          handleInput={handleInputChange}
          fields={fields}
          selectHandler={selectHandler}
          selectedOption={selected ? selected.selectedOptions : null}
        />
      </div>
    </div>
  );
};

export default CreateSettings;
