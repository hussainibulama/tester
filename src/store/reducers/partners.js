import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentPartners: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PARTNERS:
      return {
        ...state,
        currentPartners: action.payload,
      };
    default:
      return state;
  }
};


export default reducer;
