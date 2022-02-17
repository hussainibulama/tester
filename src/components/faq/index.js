/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import TransactionsTable from "./table";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import moment from "moment";
import instance from "../../utils/axios";

const Faq = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [indexes, setIndexes] = useState([]);
  const [selectionModel,setSelectionModel] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [counts, setCounts] = useState(1);

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
      id: x._id,
      subject: x.subject,
      question: x.question,
      answer: x.answer,
      added_by: x.added_by,
      created_at: moment(x.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a"),
      type: x.type,

      
    };
  });


  async function fetchTransactions(tip) {
    try {
      const res = await instance.get(`auth/v2/admin/faqs?platform=web`);
      let result = await res.data;
      setDiscounts(result.data);
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
  async function approvals(id) {
    
    try {
      let res = await instance.post(
        `/merchant/v2/admin/approve-partner/${discounts[id].user_id}?platform=web`,
      );
      let result = await res.data;
      if (result && result.status === 'success') {
        fetchTransactions();
      }
    } catch (e) {
      console.log(e);
    }finally{
      fetchTransactions();
    }
  }


  async function togglePublishStatus(id) {
    axios
      .put(`/insights/publish/${id}`, {
        publishedStatus: 1,
      })
      .then((res) => {
        toast.success(res.data.message);
        fetchTransactions();
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
    fetchTransactions();
  }, []);
  return (
    <div>
      <div className="section">
        <div className="section_header">
          <h2>Frequently Ask Questions</h2>
          <NavLink
            to="/Create/Faq"
            className="section_header_button"
          >
            Add Faq
          </NavLink>
        </div>
        <div className="section_body">
          <TransactionsTable 
            rows={rows}
            loading={loading}
            setIndexes={initDelete}
            
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

export default Faq;
