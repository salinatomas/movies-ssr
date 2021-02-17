import { actions } from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case actions.setFavorite:
      const exist = state.myList.find(
        (item) => item._id === action.payload._id
      );
      if (exist) {
        return { ...state };
      }
      return {
        ...state,
        myList: [...state.myList, action.payload],
      };
    case actions.deleteFavorite:
      return {
        ...state,
        myList: state.myList.filter((items) => items._id !== action.payload),
      };
    case actions.loginRequest:
      return {
        ...state,
        user: action.payload,
      };
    case actions.logoutRequest:
      return {
        ...state,
        user: action.payload,
      };
    case actions.registerRequest:
      return {
        ...state,
        user: action.payload,
      };
    case actions.getVideoSource:
      return {
        ...state,
        playing:
          state.trends.find((item) => item._id === action.payload) ||
          state.originals.find((item) => item._id === action.payload) ||
          {},
      };
    default:
      return state;
  }
};

export default reducer;
