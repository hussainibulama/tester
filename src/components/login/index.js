import React, { useState } from "react";

import Logo from "../../assets/logo.png";
import { NavLink, useHistory } from "react-router-dom";
import "./styles.scss";
import "../../styles/utils.scss";
import instance from "../../utils/axios";

const Login = () => {
  const history = useHistory();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  async function login() {
    try {
      let res = await instance.post("/admin/v2/login", {
        username: inputValues.email,
        password: inputValues.password,
      });
      let result = await res.data;
      if (result.status === "success") {
        console.log("yes" + result.token + result.data);
        localStorage.setItem("token", JSON.stringify(result.token));
        localStorage.setItem("userDetails", JSON.stringify(result.data));
        history.push("/dashboard");
        history.go(0);
      } else {
        console.log(result);
        setErrMessage(JSON.stringify(result.message));
        setError(true);
      }
    } catch (error) {
      console.log(error.response.data);
      let res = error.response.data.message;
      let response = String(res).replace(/["']+/g, "");
      setErrMessage(JSON.stringify(response));
      setError(true);
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    login();
    /*setError(false);
    (async () => {
      let res = await instance.post("/auth/login", {
        email: inputValues.email,
        password: inputValues.password,
      });
      let result = await res.data;
      if (result.status === "success") {
        history.push("/dashboard");
      } else {
        console.log(result);
        setErrMessage(JSON.stringify(result.message));
        setError(true);
      }
    })();
    */

    //dispatch(actions.login({ ...fields }));
  };

  return (
    <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
      <form className="login100-form validate-form flex-sb flex-w">
        <span className="login100-form-logo p-b-84">
         <span style={{fontSize:"50px", fontFamily:"inherit", fontWeight:"bold"}}>Admoni</span>
        </span>
        <div style={{ width: "100%", marginBottom: "1em" }}>
          {error && (
            <span style={{ color: "red" }}>
              {errMessage.replaceAll(/["']/g, "")}
            </span>
          )}
        </div>

        <span className="txt1 p-b-12">Email Address</span>
        <div
          className="wrap-input100 validate-input m-b-24"
          data-validate="Email is required"
        >
          <input
            onChange={handleChange}
            className="input100"
            type="email"
            name="email"
          />
          <span className="focus-input100"></span>
        </div>

        <span className="txt1 p-b-12">Password</span>
        <div
          className="wrap-input100 validate-input m-b-40"
          data-validate="Password is required"
        >
          <span className="btn-show-pass">
            <i className="fa fa-eye"></i>
          </span>
          <input
            onChange={handleChange}
            className="input100"
            type="password"
            name="password"
          />
          <span className="focus-input100"></span>
        </div>

        <div className="container-login100-form-btn m-b-24">
          <button onClick={onSubmit} className="login100-form-btn">
            Sign in
          </button>
        </div>

        <div className="flex-sb-m w-full p-b-48 forgot-link">
          <div className="txt3">
            Forgot Password? <NavLink to="#">Reset Now</NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
