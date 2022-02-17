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

const Redemption = () => {
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
      id: index,
      user_id: x.user_id,
      amount: x.amount,
      destination: x.destination,
      product: x.product,
      product_category: x.product_category,
      created_at: moment(x.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a"),
   

      
    };
  });
  async function prev(){
    setCounts(counts-1);
    if(counts>1){
      fetchTransactions("minus");
    }

  }
  async function next(){
    setCounts(counts+1);
    fetchTransactions("plus");
  }

  async function fetchTransactions(tip) {
    try {
      const res = await instance.get(`/auth/v2/admin/redemption-logs?limit=100&page=${tip?tip==="plus"?counts+1:tip==="minus"&&counts>1?counts-1:counts:counts}&platform=web`);
      let result = await res.data;
      setDiscounts(result.data.users);
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
        fetchTransactions();
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
          <h2>Redemption</h2>
          {/* <NavLink
            to="/Insights/Create-Insight"
            className="section_header_button"
          >
            Add New
          </NavLink> */}
        </div>
        <div className="section_body">
          <TransactionsTable 
            rows={rows}
            loading={loading}
            setIndexes={initDelete}
            deleteItems={deleteInsights}
            indexes={indexes}
            clearIndexes={clearIndexes}
            toggleStatus={togglePublishStatus}
            setSelectionModel={setSelectionModel}
            selectionModel={selectionModel}
            prev={prev}
            next={next}
           
          />
        </div>
      </div>
    </div>
  );
};

export default Redemption;
