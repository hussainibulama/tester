import * as actionTypes from "./actionTypes";

export const setInsights = (payload) => {
  return {
    type: actionTypes.SET_INSIGHTS,
    payload,
  };
};
