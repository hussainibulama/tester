import React, { useState, useEffect } from "react";
import Form from "./form";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import Loader from "../../ui/loader";
import { useHistory } from "react-router";
import TransactionsTable from "./table";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from 'react-router-dom';

import instance from "../../../utils/axios";
const defaults = {
  title: "",
  seoTitle: "",
  altText: "",
  slug: "",
  metaDesc: "",
};

const CreateUsers = () => {
  const dispatch = useDispatch();
  const params = useParams();

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
      new_balance: x.new_balance,
      previous_balance: x.previous_balance,
      product_category: x.product_category,
      transaction_id: x.transaction_id,
      product_category: x.product_category,
      created_at: moment(x.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a"),
      status: x.status === "false" ? "False" : "True",
      type: x.type,

      
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

  async function fetchTransactions() {
    try {
      const res = await instance.get(`auth/v2/admin/transactions?limit=100&platform=web`,{
        email:params.id ,
      });
      let result = await res.data;
      setDiscounts(result.data.transactions);
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
    <div className={styles.section}>
      <div className={styles.section_header}>
        <h2>View {params.id} Transactions</h2>
        <div className={styles.section_header_buttons}>
          
        </div>
      </div>
      <div className={styles.section_body}>
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
  );
};

export default CreateUsers;
