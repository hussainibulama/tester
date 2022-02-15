import * as actionTypes from "./actionTypes";

import axios from "../../utils/axios";

export const authStart = (payload) => {
  return {
    type: actionTypes.AUTH_START,
    payload,
  };
};

export const authError = (payload) => {
  return {
    type: actionTypes.AUTH_ERROR,
    payload,
  };
};

export const setCurrentUser = (payload) => {
  return {
    type: actionTypes.SET_USER,
    payload,
  };
};

// sign up

export const signup = ({ first_name, last_name, email, password }) => {
  return async (dispatch) => {
    dispatch(authStart(true));

    try {
      const response = await axios.post("auth/register", {
        first_name,
        last_name,
        email,
        password,
      });

      dispatch(setCurrentUser(response.data));
    } catch (err) {
      dispatch(authError(err.response.data.error.message));
    } finally {
      dispatch(authStart(false));
    }
  };
};

// login

export const login = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(authStart(true));

    try {
      const response = await axios.post("auth/login", {
        email,
        password,
      });

      dispatch(setCurrentUser(response.data));
      // console.log(response.data)
    } catch (err) {
      dispatch(authError(err.response.data.error.message));
    } finally {
      dispatch(authStart(false));
    }
  };
};
