import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import "./styles.scss";
import "../../styles/utils.scss";

const AuthLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {}, [location.pathname]);

  return (
    <div className="limiter">

      <div className="container-login100">{children}</div>
    </div>
  );
};

export default AuthLayout;
