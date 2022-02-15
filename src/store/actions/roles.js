import * as actionTypes from "./actionTypes";

export const setRoles = (payload) => {
  return {
    type: actionTypes.SET_ROLES,
    payload,
  };
};

export const setPermissions = (payload) => {
  return {
    type: actionTypes.SET_PERMISSIONS,
    payload,
  };
};
