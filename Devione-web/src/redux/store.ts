import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";


const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
