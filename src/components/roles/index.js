/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.scss";
import CareersTable from "./table";
import { useState, useEffect } from "react";
import Add from "./add.js";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import moment from "moment";
import EditRoleModal from "./edit";
import instance from "../../utils/axios";
const Careers = () => {
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

  const { roles, permissions } = useSelector((state) => {
    return {
      roles: state.roles.roles,
      permissions: state.roles.permissions,
    };
  });

  const clearIndexes = () => {
    setIndexes([]);
  };

  async function fetchPermissions() {
    try {
      const response = await axios.get("/roles/get-permissions/list");
      dispatch(actions.setPermissions(response.data));
    } catch (err) {
      toast.error(err);
    }
  }

  const rows = users.map((x, index) => {
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
  async function fetchUsers() {
    try {
      const res = await instance.get("/auth/v2/admin/users?limit=100&platform=web");
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
        {/* <button onClick={() => start()} className="section_header_button">
          Add New
        </button> */}
      </div>
      {modals === true && (
        <Add
          displayModal={modals}
          closeModal={() => setModals(false)}
          permissions={permissions}
          getRoles={fetchRoles}
        />
      )}

      {editModal.isOpen && (
        <EditRoleModal
          displayModal={editModal.isOpen}
          roleId={editModal.id}
          closeModal={() =>
            setEditModal({
              isOpen: false,
              id: null,
            })
          }
          permissions={permissions}
          getRoles={fetchRoles}
        />
      )}

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
        />
      </div>
    </div>
  );
};

export default Careers;
