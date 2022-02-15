import React,{ useState, useEffect} from "react";
import { NavLink, useLocation } from "react-router-dom";

import ProfileImg from "../../../assets/profile.png"

import "./styles.scss";

const DashboardHeader = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const location = useLocation();
  useEffect(() => {
    let details = JSON.parse(localStorage.getItem("userDetails"));
    setfirstName(details.lastName);
    setlastName(details.firstName);

}, []);
  return (
    <header className="dash_header">
      <div className="dash_header__notif">
        <span>Admoni{location.pathname}</span>
      </div>

      <div className="dash_header__actions">
        <div className="profile_img">
          <img src={ProfileImg} alt="profile" />
        </div>

        <div className="dropdown_wrapper">
          <NavLink to="/profile" style={{textDecoration: 'none'}}>{firstName} {lastName}</NavLink>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
