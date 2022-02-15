/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import InsightsTable from "./table";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import moment from "moment";
import instance from "../../utils/axios";

const InsightsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [indexes, setIndexes] = useState([]);
  const [selectionModel,setSelectionModel] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  const { currentInsights } = useSelector((state) => {
    return {
      currentInsights: state.insights.currentInsights,
    };
  });

  const clearIndexes = () => {
    setIndexes([]);
  };

  const rows = discounts.map((x, index) => {
    return {
      id: index,
      partner: x.business_name,
      category: x.business_category,
      location: x.address+","+x.local_government+","+x.country,
      status: x.partner_approval === "pending" ? "Pending" : "Approved",
      
    };
  });
  async function approvals(id) {
    
    try {
      let res = await instance.post(
        `/merchant/v2/admin/approve-partner/${discounts[id].user_id}?platform=web`,
      );
      let result = await res.data;
      if (result && result.status === 'success') {
        fetchDiscounts();
      }
    } catch (e) {
      console.log(e);
    }finally{
      fetchDiscounts();
    }
  }
  async function fetchDiscounts() {
    try {
      const res = await instance.get("/merchant/v2/admin/get-partners?platform=web");
      let result = await res.data;
      setDiscounts(result.data.Partners);
    } catch (err) {
      console.log(err);
    
    } 
  }

  const initDelete = (ids) => {
    const selectedIds = new Set(ids);
    const selectedRows = currentInsights.filter((row) => selectedIds.has(row.id));

    setIndexes(
      selectedRows.map((x) => {
        return x.id;
      })
    );

    // console.log(selectedIds);
  };

  async function deleteInsights(ids) {
    axios
      .delete("/insights", {
        data: { ids: [...ids] },
      })
      .then((res) => {
        toast.success(res.data.message);
        fetchDiscounts();
        clearIndexes();
      })
      .catch((error) => {
        if (error.response.data.message) {
          toast.error(error.response.data.message[0]);
        } else {
          toast.error("An error occured!");
        }
      });
  }

  async function togglePublishStatus(id) {
    axios
      .put(`/insights/publish/${id}`, {
        publishedStatus: 1,
      })
      .then((res) => {
        toast.success(res.data.message);
        fetchDiscounts();
      })
      .catch((error) => {
        if (error.response.data.message) {
          toast.error(error.response.data.message[0]);
        } else {
          toast.error("An error occured!");
        }
      });
  }

  useEffect(() => {
    fetchDiscounts();
  }, []);
  return (
    <div>
      <div className="section">
        <div className="section_header">
          <h2>Business Accounts</h2>
          {/* <NavLink
            to="/Insights/Create-Insight"
            className="section_header_button"
          >
            Add New
          </NavLink> */}
        </div>
        <div className="section_body">
          <InsightsTable 
            rows={rows}
            loading={loading}
            setIndexes={initDelete}
            deleteItems={deleteInsights}
            indexes={indexes}
            clearIndexes={clearIndexes}
            toggleStatus={togglePublishStatus}
            setSelectionModel={setSelectionModel}
            selectionModel={selectionModel}
            approvals={approvals}
          />
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
