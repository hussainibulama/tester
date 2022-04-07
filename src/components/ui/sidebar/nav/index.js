import React from "react";
import "./styles.scss";
import { ReactComponent as Logo } from "../../../../assets/logo.svg";
import { ReactComponent as Dashboard } from "../../../../assets/dashboard.svg";
import { ReactComponent as Pages } from "../../../../assets/pages.svg";
import { ReactComponent as Insights } from "../../../../assets/insights.svg";
import { ReactComponent as Services } from "../../../../assets/services.svg";
import { ReactComponent as CaseStudies } from "../../../../assets/case-study.svg";
import { ReactComponent as Clients } from "../../../../assets/services.svg";
import { ReactComponent as Partners } from "../../../../assets/partners.svg";
import { ReactComponent as Careers } from "../../../../assets/careers.svg";
import { ReactComponent as RoleManagement } from "../../../../assets/roles-management.svg";
import { ReactComponent as Logout } from "../../../../assets/logout.svg";
import { NavLink, useHistory } from "react-router-dom";

const Nav = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    history.push("/login");
    history.go(0);
  };
  return (
    <nav className="nav">
      <div className="nav__logo">
        <NavLink to="/" aria-label="brand logo"  style={{color:"#fff", textDecoration:"none"}}>
        <span style={{color:"#fff", fontSize:"30px"}}>Admoni</span>
        </NavLink>
        <p>Admin Controller</p>
      </div>

      <ul>
        <li>
          <NavLink to="/Dashboard">
            <Dashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Users">
            <RoleManagement />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Pages">
            <Pages />
            <span>Business</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/Insights">
            <Insights />
            <span>Discount Partners</span>
          </NavLink>
        </li>

   
        <li>
          <NavLink to="/CaseStudy">
            <CaseStudies />
            <span>Adverts</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/AdsGroup">
            <CaseStudies />
            <span>Advert Groups</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/Transactions">
            <Clients />
            <span>Transaction</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/Redemption">
            <Partners />
            <span>Redemption</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/Faq">
            <Careers />
            <span>FAQ</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/map">
            <Services />
            <span>User Map</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Settings">
            <RoleManagement />
            <span>Settings</span>
          </NavLink>
        </li>

      </ul>
      <div className="nav__footer">
        <span
          onClick={() => logout()}
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          <div className="footer_center">
            <Logout />
            <span>Logout</span>
          </div>
        </span>
      </div>
    </nav>
  );
};

export default Nav;
