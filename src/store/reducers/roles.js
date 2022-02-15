import * as actionTypes from "../actions/actionTypes";

const initial = {
  roles: [],
  permissions: [],
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case actionTypes.SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
