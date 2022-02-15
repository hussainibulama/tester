/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import CaseStudyTable from "./table";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import instance from "../../utils/axios";
import moment from "moment";

const CaseStudyPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [indexes, setIndexes] = useState([]);
  const [Adverts, setAdverts] = useState([]);
  const [selectionModel,setSelectionModel] = useState([]);

  const { caseStudies } = useSelector((state) => {
    return {
      caseStudies: state.caseStudy.caseStudies,
    };
  });

  const clearIndexes = () => {
    setIndexes([]);
  };
// const rows = 
//   [
//     {
//       id:400,
//       title:"Hussainisss",
//       status: "Active",
//       publishedDate: moment("08/07/2022").format("ll"),
//       pageHits:110

//   },
//   {
//     id:410,
//     title:"Hussainis",
//     status: "Active",
//     publishedDate: moment("08/04/2022").format("ll"),
//     pageHits:12

// },
// {
//   id:421,
//   title:"Hussaini",
//   status: "Active",
//   publishedDate: moment("08/02/2022").format("ll"),
//   pageHits:20

// }
// ]

  const rows = Adverts.map((x) => {
    return {
      id: x.adsId,
      advertiser: x.advertiser,
      adsid: x.adsId ,
      publishedDate: moment(x.date).format("ll"), 
      status:x.status === "Not approved" ? "Pending" : "Active",
    };
  });

  async function fetchAdverts() {
    try {
      const res = await instance.get("/advert/v2/admin/get-all-ads?platform=web");
      let result = await res.data;
      setAdverts(result.data);
    } catch (err) {
      console.log(err);
    
    } 
  }

  const initDelete = (ids) => {
    const selectedIds = new Set(ids);
    const selectedRows = caseStudies.filter((row) => selectedIds.has(row.id));

    setIndexes(
      selectedRows.map((x) => {
        return x.id;
      })
    );

    // console.log(selectedIds);
  };

  async function deleteCaseStudy(ids) {
    axios
      .delete("/case-study", {
        data: { ids: [...ids] },
      })
      .then((res) => {
        toast.success(res.data.message);
        fetchAdverts();
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
      .put(`/case-study/publish/${id}`, {
        publishedStatus: 1,
      })
      .then((res) => {
        toast.success(res.data.message);
        fetchAdverts();
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
    fetchAdverts();
  }, []);

  return (
    <div>
      <div className="section">
        <div className="section_header">
          <h2>Adverts</h2>
          {/* <NavLink
            to="/CaseStudy/Create-Service"
            className="section_header_button"
          >
            Add New
          </NavLink> */}
        </div>
        <div className="section_body">
        
          <CaseStudyTable
            rows={rows}
            loading={loading}
            setIndexes={initDelete}
            deleteItems={deleteCaseStudy}
            indexes={indexes}
            clearIndexes={clearIndexes}
            toggleStatus={togglePublishStatus}
            setSelectionModel={setSelectionModel}
            selectionModel={selectionModel}
          />
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;
