import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentInsights: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INSIGHTS:
      return {
        ...state,
        currentInsights: action.payload,
      };
    default:
      return state;
  }
};


export default reducer;
