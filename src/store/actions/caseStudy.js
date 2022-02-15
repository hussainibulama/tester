import * as actionTypes from "./actionTypes";

export const setCaseStudy = (payload) => {
  return {
    type: actionTypes.SET_CASE_STUDY,
    payload,
  };
};
