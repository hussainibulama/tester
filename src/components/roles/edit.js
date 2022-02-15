/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./createCareers/form/styles.module.css";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import Loader from "../ui/loader";

const EditRoleModal = (props) => {
  const divStyle = {
    display: props.displayModal ? "block" : "none",
  };
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }

  const [loading, setLoading] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [rolePermissions, setPermissions] = useState([]);
  const [active, setActive] = useState(1);
  const [checkedState, setCheckedState] = useState(
    new Array(props.permissions.length).fill(false)
  );

  const handleCheckbox = (e, position) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position ? !item : item;
    });

    setCheckedState(updatedCheckedState);

    if (rolePermissions.includes(e.target.value)) {
      const filtered = rolePermissions.filter((x) => {
        return x !== e.target.value;
      });
      setPermissions(filtered);
    } else {
      setPermissions([...rolePermissions, e.target.value]);
    }
  };

  const resetFields = () => {
    setRoleName("");
    setPermissions([]);
    setActive(1);
    setCheckedState(new Array(props.permissions.length).fill(false));
  };

  async function editRole() {
    setLoading(true);

    axios
      .patch(`/roles/${props.roleId}`, {
        isActivated: active,
        title: roleName,
        permissions: [...rolePermissions],
      })
      .then((res) => {
        toast.success(res.data.message);
        props.getRoles();
      })
      .catch((error) => {
        if (
          error &&
          error.response &&
          error.response.data &&
          Array.isArray(error.response.data.message)
        ) {
          toast.error(error.response.data.message[0]);
        } else {
          toast.error(error.response.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
        props.closeModal();
        resetFields();
      });
  }

  async function fetchRole() {
    try {
      const response = await axios.get(`/roles/${props.roleId}`);
      // console.log(response.data.message);
      const { title, isActivated } = response.data.message;

      setRoleName(title);
      setActive(isActivated);
      //   setPermissions([...rolePermissions, permissions]);
    } catch (err) {
      toast.error(err);
    }
  }

  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <div className="modals" onClick={closeModal} style={divStyle}>
      {" "}
      <div className="modalsabt" onClick={(e) => e.stopPropagation()}>
        {" "}
        <div className="flex-modal-exit">
          <div>
            <h1 className="general">Edit Role</h1>
          </div>
          <div style={{ marginTop: "-3em" }}>
            <button className="close" onClick={closeModal}>
              x
            </button>
          </div>
        </div>
        <div className="contents">
          <p className="general">
            lorp ipsium sole to the regulatio of the highest order to in
            activity or cause
          </p>
          <br />
          <div className={styles.seoSettings}>
            <div className={styles.title}>
              <input
                type="text"
                name="roleName"
                placeholder="Role Name"
                onChange={(e) => setRoleName(e.target.value)}
                value={roleName}
              />
            </div>
          </div>
          <h3 className="general">Permissions</h3>
          <div
            className="custom-checkbox"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {props.permissions &&
              props.permissions.length > 0 &&
              props.permissions.map((x, index) => {
                return (
                  <label className="container" key={x}>
                    <span style={{ textTransform: "capitalize" }}>
                      {x.replace(/_/g, " ")}
                    </span>
                    <input
                      type="checkbox"
                      value={x}
                      checked={checkedState[index]}
                      onChange={(e) => handleCheckbox(e, index)}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
          </div>
          <br />
          <div className={styles.visibility}>
            <h3 className="general">Role Status</h3>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "38px", fontWeight: "300" }}>
                <label className={styles.container}>
                  <input
                    type="radio"
                    name="visibility"
                    onChange={() => setActive(1)}
                    value={active}
                    checked={active === 1}
                    placeholder="Active"
                  />
                  Active
                </label>
              </div>
              <div style={{ fontWeight: "300" }}>
                <label className={styles.container}>
                  <input
                    type="radio"
                    name="visibility"
                    onChange={() => setActive(0)}
                    value={active}
                    checked={active === 0}
                    placeholder="Archived"
                  />
                  Archived
                </label>
              </div>
            </div>
          </div>
        </div>
        <button className="section_header_button" onClick={editRole}>
          {loading && <Loader />} Edit
        </button>
      </div>
    </div>
  );
};
export default EditRoleModal;
