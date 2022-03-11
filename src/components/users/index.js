/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.scss";
import CareersTable from "./table";
import { useState, useEffect } from "react";

import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

import instance from "../../utils/axios";
import { NavLink } from "react-router-dom";
const Users = () => {
  const [modals, setModals] = useState(false);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    id: null,
  });
  const [loading, setLoading] = useState(false);
  const [indexes, setIndexes] = useState([]);
  const dispatch = useDispatch();
  const [selectionModel,setSelectionModel] = useState([]);
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState(1);
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [pagiS, setpagiS] = useState(0);
  const [pagiE, setpagiE] = useState(0);

  const { roles, permissions } = useSelector((state) => {
    return {
      roles: state.roles.roles,
      permissions: state.roles.permissions,
    };
  });

  const clearIndexes = () => {
    setIndexes([]);
  };

  async function prev(){
    setCounts(counts-1);
    if(counts>1){
      fetchUsers("minus");
    }

  }
  async function next(){
    setCounts(counts+1);
    fetchUsers("plus");
  }
  async function fetchPermissions() {
    try {
      const response = await axios.get("/roles/get-permissions/list");
      dispatch(actions.setPermissions(response.data));
    } catch (err) {
      toast.error(err);
    }
  }

  const rows = users.map((x,index) => {
    return {
      id:index,
      username:x.username,
      type:x.type,
      phone:x.phone_number,
      email:x.email,
      coins:x.admoni_coins,
      verify:x.status === false ? "False" : "True",
      board:x.status === false ? "False" : "True",
      status: x.status === false ? "False" : "True",
    };
  });

  async function start() {
    setModals(true);
  }

  async function fetchRoles() {
    setLoading(true);

    try {
      const response = await axios.get("/roles");
      dispatch(actions.setRoles(response.data.roless));
      //   console.log(response);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  const initDelete = (ids) => {
    const selectedIds = new Set(ids);
    const selectedRows = roles.filter((row) => selectedIds.has(row.ress.uid));

    setIndexes(
      selectedRows.map((x) => {
        return x.ress.uid;
      })
    );
  };

  async function deleteRole(ids) {
    axios
      .delete("/roles", {
        data: { ids: [...ids] },
      })
      .then((res) => {
        toast.success(res.data.message);
        fetchRoles();
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
  async function block(id) {
    
    try {
      let res = await instance.post(
        `/auth/v2/admin/block-user/${users[id]._id}?platform=web`,
      );
      let result = await res.data;
      if (result && result.status === 'success') {
        fetchUsers();
      }
    } catch (e) {
      console.log(e);
    }finally{
      fetchUsers();
    }
  }
  async function unblock(id) {
    
    try {
      let res = await instance.post(
        `/auth/v2/admin/unblock-user/${users[id]._id}?platform=web`,
      );
      let result = await res.data;
      if (result && result.status === 'success') {
        fetchUsers();
      }
    } catch (e) {
      console.log(e);
    }finally{
      fetchUsers();
    }
  }
  async function deletes(id) {
    
    try {
      let res = await instance.post(
        `/auth/v2/admin/users/${users[id]._id}?platform=web`,
      );
      let result = await res.data;
      if (result && result.status === 'success') {
        fetchUsers();
      }
    } catch (e) {
      console.log(e);
    }finally{
      fetchUsers();
    }
  }
  async function fetchUsers(tip) {
    try {
      const res = await instance.get(`/auth/v2/admin/users?limit=100&page=${tip?tip==="plus"?counts+1:tip==="minus"&&counts>1?counts-1:counts:counts}&platform=web`);
      let result = await res.data;
      setUsers(result.data.users);
      setpagiE(result.data.pagination.pageCount);
      setpagiS(result.data.pagination.currentPage);
    } catch (err) {
      console.log(err);
    
    } 
  }
async function SearchDate(e){
  e.preventDefault();
  const f = starts.split("-");
  const s = ends.split("-");
  try {
    const res = await instance.get(`/auth/v2/admin/sort-users?start_date=${f[2]+"-"+f[1]+"-"+f[0]}&end_date=${s[2]+"-"+s[1]+"-"+s[0]}&platform=web`,{
      "start_date":f[2]+"-"+f[1]+"-"+f[0],
      "end_date":s[2]+"-"+s[1]+"-"+s[0],
    });
    let result = await res.data;
    setUsers(result.data.users);
  } catch (err) {
    console.log(err);
  
  } 
}
  useEffect(() => {
    fetchUsers();
    fetchPermissions();
  }, []);

  return (
    <div className="section">
      <div className="section_header">
        <h2>Users</h2>
        {/* <NavLink
            to="/Users/Create"
            className="section_header_button"
          >
            Add New
          </NavLink>  */}
  
      </div>
      <div className="section_header" style={{margin:0}}>
        <h2>Search by date</h2>
        </div>
      <div className="section_inputer">
          <div>
            <input onChange={(e)=>setStarts(e.target.value)} type="date"/>
          </div>
          <div>
            <input onChange={(e)=>setEnds(e.target.value)} type="date"/>
          </div>

          <div>
            <button onClick={(e)=>SearchDate(e)}>Search</button>
          </div>
        </div>

 
      <div className="section_body">
        <CareersTable
          rows={rows}
          loading={loading}
          indexes={indexes}
          setSelectionModel={setSelectionModel}
          selectionModel={selectionModel}
          block={block}
          unblock={unblock}
          deletes={deletes}
          clearIndexes={clearIndexes}
          setIndexes={initDelete}
          deleteItems={deleteRole}
          openEditModal={(roleId) => {
            setEditModal({
              isOpen: true,
              id: roleId,
            });
          }}
          prev={prev}
          next={next}
          pagiE={pagiE}
          pagiS={pagiS}
        />
      
      </div>
    </div>
  );
};

export default Users;
