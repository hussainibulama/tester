/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Form from "./form";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import Loader from "../../ui/loader";
import { useHistory, useParams } from "react-router";

const EditCaseStudy = () => {
  const history = useHistory();
  const { id } = useParams();

  const defaults = {
    title: "",
    seoTitle: "",
    altText: "",
    slug: "",
    metaDesc: "",
  };

  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [existingImgId, setExistingImgId] = useState(null);
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
    setExistingImgId(null);
    setSelected(null);
    setDescription(null);
  };

  async function fetchCaseStudy() {
    setLoading(true);

    try {
      const response = await axios.get(`/case-study/${id}`);
      // console.log(response.data.message.data);
      const { title, seoTitle, slug, body, tags, galleryId } =
        response.data.message.data;
      setFields({
        ...fields,
        title,
        seoTitle,
        slug,
      });
      setDescription(body);
      setExistingImgId(galleryId);
      setSelected({
        selectedOptions: tags.map((tag) => {
          return {
            value: tag,
            label: tag.charAt(0).toUpperCase() + tag.slice(1),
          };
        }),
      });
    } catch (err) {
      console.log(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateCaseStudy(data) {
    setLoading(true);

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
        .patch(`/case-study/${id}`, {
          ...data,
          galleryId: image?.length > 0 ? res.data.message.id : existingImgId,
        })
        .then(() => {
          toast.success("Case Study Updated Successfully!");
          resetFields();
          history.push("/CaseStudy");
        })
        .catch((error) => {
          if (error.response.data.message) {
            toast.error(error.response.data.message[0]);
          } else {
            toast.error("An error occurred!");
          }
        });
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }
  const onSubmit = () => {
    updateCaseStudy({
      title: fields.title,
      body: description,
      tags: selected.selectedOptions
        ? selected.selectedOptions.map((x) => {
            return x.value;
          })
        : [],
      // adminId: 1,
    });
  };

  useEffect(() => {
    fetchCaseStudy();
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.section_header}>
        <h2>Create Case Study</h2>
        <div className={styles.section_header_buttons}>
          <button
            className={styles.section_header_button_publish}
            onClick={onSubmit}
          >
            {loading && <Loader />}
            Edit
          </button>
        </div>
      </div>
      <div className={styles.section_body}>
        <Form
          handleInput={handleInputChange}
          fields={fields}
          selectHandler={selectHandler}
          selectedOption={selected ? selected.selectedOptions : null}
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
        />
      </div>
    </div>
  );
};

export default EditCaseStudy;
