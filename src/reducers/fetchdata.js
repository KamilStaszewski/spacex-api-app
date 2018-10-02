import {
  FETCH_DATA,
  UPDATE_INPUT,
  SHOW_MODAL,
  CLOSE_MODAL
} from "../constants/ActionTypes";

const initialState = {
  flights: [],
  value: ""
}


export default (state = initialState, action) => {
  console.log("reducer hit")
  switch (action.type) {
    case FETCH_DATA:
      return Object.assign({}, state, {
        flights: action.payload
      });
    case UPDATE_INPUT:
      return Object.assign({}, state, {
        value: action.payload
      });
    case SHOW_MODAL:
      return Object.assign({}, state, {
        showModal: true,
        indexModal: action.index
      })
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        showModal: false
      })
    default:
      return state;
  }
};