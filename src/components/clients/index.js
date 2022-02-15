/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import ClientsTable from "./table";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import moment from "moment";

const ClientsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [indexes, setIndexes] = useState([]);

  const { clients, categories } = useSelector((state) => {
    return {
      clients: state.clients.clients,
      categories: state.menuCategory.categories,
    };
  });

  const clearIndexes = () => {
    setIndexes([]);
  };

  const rows =
    categories?.length > 0
      ? clients.map((x, index) => {
          const categoryId = categories.find((menu) => {
            return menu.id === x.category;
          });

          return {
            id: x.id,
            title: x.name,
            category: categoryId.name,
            addedDate: moment(x.createdAt).format("ll"),
            status: x.status === 0 ? "In Draft" : "Active",
            desc: x.description,
          };
        })
      : [];

  async function fetchAllClients() {
    setLoading(true);

    try {
      const response = await axios.get("/client");
      dispatch(actions.setAllClients(response.data.message.allClients));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const initDelete = (ids) => {
    const selectedIds = new Set(ids);
    const selectedRows = clients.filter((row) => selectedIds.has(row.id));

    setIndexes(
      selectedRows.map((x) => {
        return x.id;
      })
    );
  };

  async function deleteClient(ids) {
    axios
      .delete("/client/delete-many", {
        data: { clientIds: [...ids] },
      })
      .then((res) => {
        toast.success(res.data.message);
        fetchAllClients();
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

  useEffect(() => {
    fetchAllClients();
  }, []);

  return (
    <div className="section">
      <div className="section_header">
        <h2>Clients</h2>
        <NavLink to="/Clients/Create-Client" className="section_header_button">
          Add New
        </NavLink>
      </div>
      <div className="section_body">
        <ClientsTable
          rows={rows}
          loading={loading}
          setIndexes={initDelete}
          deleteItems={deleteClient}
          indexes={indexes}
          clearIndexes={clearIndexes}
        />
      </div>
    </div>
  );
};

export default ClientsPage;
