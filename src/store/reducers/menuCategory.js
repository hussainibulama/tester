import * as actionTypes from "../actions/actionTypes";

const initial = {
  categories: [],
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.SET_MENU_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
