import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "./form";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import Loader from "../../ui/loader";
import { useSelector } from "react-redux";

const defaults = {
  name: "",
  category: "",
  altText: "",
};

const CreateClientsPage = () => {
  const history = useHistory();
  const [publish, setPublish] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    ...defaults,
  });

  const resetFields = () => {
    setFields({
      ...defaults,
    });
    setImage([]);
    setDescription("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const { categories } = useSelector((state) => {
    return {
      categories: state.menuCategory.categories,
    };
  });

  async function createClient(data, publish) {
    setLoading(true);

    if (publish) {
      setPublish(true);
    } else {
      setPublish(false);
    }

    axios
      .post("/client/add", data)
      .then(() => {
        toast.success("Client Added Successfully!");
        resetFields();
        history.push("/Clients");
      })
      .catch((error) => {
        if (error.response.data.message) {
          toast.error(error.response.data.message[0]);
        } else {
          toast.error("This Client Exists!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const onSubmit = (publish) => {
    createClient(
      {
        name: fields.name,
        description: description,
        category: parseInt(fields.category),
        status: publish ? 1 : 0,
        logo: image.length >= 1 ? image[0].path : "",
      },
      publish
    );
  };

  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        <h2>Create Clients</h2>
        <div className={styles.section_header_buttons}>
          <button
            className={styles.section_header_button_draft}
            onClick={() => onSubmit()}
          >
            {loading && !publish && <Loader />}
            Save as Draft
          </button>
          <button
            className={styles.section_header_button_publish}
            onClick={() => onSubmit(true)}
          >
            {loading && publish && <Loader />}
            Publish
          </button>
        </div>
      </div>
      <div className={styles.section_body}>
        <Form
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
          handleInput={handleInputChange}
          fields={fields}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default CreateClientsPage;
