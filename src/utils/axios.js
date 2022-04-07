import axios from "axios";
import https from "https";
const instance = axios.create({
  baseURL: "https://tapi.admoni.net/",
  //baseURL: "http://localhost:3007/",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": " *",
    Authorization:
      typeof localStorage.getItem("token") !== "undefined"
        ? "Bearer " + JSON.parse(localStorage.getItem("token"))
        : "",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default instance;
