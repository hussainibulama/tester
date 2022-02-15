import * as actionTypes from "./actionTypes";

export const setAllClients = (payload) => {
  return {
    type: actionTypes.SET_CLIENTS,
    payload,
  };
};
