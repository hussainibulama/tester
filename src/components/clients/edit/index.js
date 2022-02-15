/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "./form";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import Loader from "../../ui/loader";
import { useSelector } from "react-redux";

const EditClients = () => {
  const history = useHistory();
  const { id } = useParams();

  const defaults = {
    name: "",
    category: "",
    altText: "",
  };

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

  const { categories, clients } = useSelector((state) => {
    return {
      categories: state.menuCategory.categories,
      clients: state.clients.clients,
    };
  });

  async function updateClient(data, publish) {
    setLoading(true);

    if (publish) {
      setPublish(true);
    } else {
      setPublish(false);
    }

    axios
      .put(`/client/edit/${id}`, data)
      .then((res) => {
        toast.success(res.data.message);
        resetFields();
        history.push("/Clients");
      })
      .catch((error) => {
        if (error.response.data.message) {
          toast.error(error.response.data.message[0]);
        } else {
          toast.error("An error occurred!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const onSubmit = (publish) => {
    updateClient(
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

  useEffect(() => {
    setTimeout(() => {
      const client = clients.find((x) => {
        return x.id === parseInt(id);
      });

      const categoryId = categories.find((x) => x.id === client.category);

      setFields({
        ...fields,
        name: client.name,
        category: categoryId.id,
      });

      setDescription(client.description);
    }, 1);
  }, []);

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

export default EditClients;
