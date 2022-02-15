import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentServices: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SERVICES:
      return {
        ...state,
        currentServices: action.payload,
      };
    default:
      return state;
  }
};


export default reducer;
