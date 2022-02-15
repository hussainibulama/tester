import * as actionTypes from "./actionTypes";

export const setPartners = (payload) => {
  return {
    type: actionTypes.SET_PARTNERS,
    payload,
  };
};
