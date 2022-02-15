import React, { useState, useEffect } from "react";
import Backdrop from "../../components/ui/backdrop";
import Sidebar from "../../components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";

import "./styles.scss";
import DashboardHeader from "../../components/ui/header";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const buttonStyle = [
    "hamburger",
    "hamburger--spin",
    open ? "is-active" : null,
  ];

  const location = useLocation();

  const openNavHandler = () => {
    setOpen(!open);

    document.documentElement.classList.toggle("_fixed");
    document.body.classList.toggle("_fixed");
  };

  useEffect(() => {
    setOpen(false);

    document.documentElement.classList.remove("_fixed");
    document.body.classList.remove("_fixed");
  }, [location.pathname]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="toast"
        transition={Flip}
      />
      <div className="dashboard-layout _max_width">
        <Sidebar isOpen={open} />
        <div className="hamburger_wrapper">
          <button
            type="button"
            aria-label="navigation button"
            className={buttonStyle.join(" ")}
            onClick={openNavHandler}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>

        <Backdrop open={open} clicked={openNavHandler} />

        <DashboardHeader />
        <main className="main">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
