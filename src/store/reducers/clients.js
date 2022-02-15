import * as actionTypes from "../actions/actionTypes";

const initial = {
  clients: [],
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.SET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
