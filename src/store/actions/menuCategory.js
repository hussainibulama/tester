import * as actionTypes from "./actionTypes";

export const setMenuCategory = (payload) => {
  return {
    type: actionTypes.SET_MENU_CATEGORIES,
    payload,
  };
};
