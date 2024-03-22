import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT,
  } from "../actions/authAction";
  
  const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string)
    : {},
    token: localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null,
  };
  export default function (state = initialState, action: {type: string, payload: any}) {
    switch (action.type) {
      case LOGIN_USER_SUCCESS:
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user
        };
      case LOGIN_USER_FAIL:
        return {
          ...state,
          token: null,
          user: null
        };
      case LOGOUT:
        return {
          ...state,
          token: null,
          user: null
        };
       
      default:
        return state;
    }
  
  }
