/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import PartnersTable from "./table";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import moment from "moment";

const PartnersPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function fetchPartners() {
    setLoading(true);

    try {
      const response = await axios.get("/partners");
      dispatch(actions.setPartners(response.data.message));
    } catch (err) {
      console.log(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  const { currentPartners, categories } = useSelector((state) => {
    return {
      currentPartners: state.partners.currentPartners,
      categories: state.menuCategory.categories,
    };
  });

  const rows =
    categories && categories.length > 0
      ? currentPartners.map((partner, index) => {
          const categoryId = categories.find((x) => {
            return x.id === partner.categoryId;
          });

          return {
            id: index + 1,
            title: partner.name,
            category: categoryId.name,
            addedDate: moment(partner.created_at).format("ll"),
            desc: partner.description,
          };
        })
      : [];

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div className="section">
      <div className="section_header">
        <h2>Partners</h2>
        <NavLink
          to="/Partners/Create-Partner"
          className="section_header_button"
        >
          Add New
        </NavLink>
      </div>
      <div className="section_body">
        <PartnersTable rows={rows} loading={loading} />
      </div>
    </div>
  );
};

export default PartnersPage;
