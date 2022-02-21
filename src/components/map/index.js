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
import Maps from "./map";
const Map = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [indexes, setIndexes] = useState([]);
  const [selectionModel,setSelectionModel] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [counts, setCounts] = useState(1);
  const [reams, setReams] = useState([]);
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
      id: x.user_id,
      coordinate:{"lat":x.latitude?x.latitude:9.072264,"lng":x.longitude?x.longitude:7.491302}
    };
  });


  async function fetchTransactions(tip) {
    try {
      const res = await instance.get(`/auth/v2/admin/mapusers?platform=web`);
      let result = await res.data;
      setDiscounts(result.data.users);
      let a = await groupByKeys(result.data.users, ["state"]);
      setReams(a);
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
  const groupByKeys = (data, props) => {
  
    let resultGroups = data.reduce((a, i) => {      
      props.forEach(p => {
        let index = a.findIndex(x => x.key === p && x.value === i[p]);
        if (index === -1) {
          a.push({ key: p, value: i[p], count: 1 });
        } else {
          a[index].count++;
        }
      });
      return a;
    }, []);
  
    let result = [];
    props.forEach(p => {
      if (resultGroups.some(x => x.key === p)) {
        result.push(resultGroups.filter(x => x.key === p));
      }
    });
    return result;
  };
 
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div>
      <div className="section">
        <div className="section_header">
          <h2>Users Map</h2>
         
          {/* <NavLink
            to="/Create/Faq"
            className="section_header_button"
          >
            Add Faq 
            
          </NavLink> */}
        </div>
        <div>
                
        </div>
        <div className="section_body">
          <div className="parks">
            <Maps
            val={rows}
            />
          </div>
        
          <div className="hors">
            {reams[0]?reams[0].map((x,index)=>(
            <div className="itemers">
                <h3>{x.count}</h3>
                <p>{x.value?x.value:"others"}</p>
            </div>
            )):""}
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
