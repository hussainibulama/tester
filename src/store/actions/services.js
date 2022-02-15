import * as actionTypes from "./actionTypes";

export const setServices = (payload) => {
  return {
    type: actionTypes.SET_SERVICES,
    payload,
  };
};
