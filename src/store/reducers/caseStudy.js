import * as actionTypes from "../actions/actionTypes";

const initial = {
  caseStudies: [],
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.SET_CASE_STUDY:
      return {
        ...state,
        caseStudies: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
