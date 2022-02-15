import * as actionTypes from "./actionTypes";

export const setPages = (payload) => {
  return {
    type: actionTypes.SET_PAGES,
    payload,
  };
};
export const setPageTemplates = (payload) => {
  return {
    type: actionTypes.SET_PAGE_TEMPLATES,
    payload,
  };
};