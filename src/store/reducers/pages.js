import * as actionTypes from "../actions/actionTypes";

const initialState = {
  currentPages: [],
  pageTemplates: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGES:
      return {
        ...state,
        currentPages: action.payload,
      };
    case actionTypes.SET_PAGE_TEMPLATES:
      return {
        ...state,
        pageTemplates: action.payload,
      };
    default:
      return state;
  }
};


export default reducer;
