import React, { useState } from "react";
import Form from "./form";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import Loader from "../../ui/loader";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const CreatePartners = () => {
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    category: "",
    altText: "",
  });

  const resetFields = () => {
    setFields({
      name: "",
      category: "",
      altText: "",
    });
    setImage([]);
    setDescription("");
  };

  const { categories } = useSelector((state) => {
    return {
      categories: state.menuCategory.categories,
    };
  });

  async function createPartner(data) {
    setLoading(true);

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
      // console.log(res.data.message.id);
      axios
        .post("/partners", {
          ...data,
          galleryId: res.data.message.id,
        })
        .then(() => {
          toast.success("Partner Published Successfully!");
          resetFields();
          history.push("/Partners");
        })
        .catch((error) => {
          if (error.response.data.message) {
            toast.error(error.response.data.message[0]);
          } else {
            toast.error("This Partner Exists!");
          }
        });
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const onSubmit = () => {
    createPartner({
      name: fields.name,
      description: description,
      categoryId: parseInt(fields.category),
    });
  };

  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        <h2>Create Partner</h2>
        <div className={styles.section_header_buttons}>
          <button className={styles.section_header_button_draft}>
            Save as Draft
          </button>
          <button
            className={styles.section_header_button_publish}
            onClick={onSubmit}
          >
            {loading && <Loader />}
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

export default CreatePartners;
