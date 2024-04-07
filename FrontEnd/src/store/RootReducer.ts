import { combineReducers } from "@reduxjs/toolkit";
import { authSlice, followSlice } from "./slice";

export const { AUTH_LOGIN, AUTH_CHECK, AUTH_EDIT, AUTH_ERROR, AUTH_LOGOUT } = authSlice.actions
export const authReducer = authSlice.reducer

export const { GET_FOLLOWS, SET_FOLLOW_STATE, SET_FOLLOW } = followSlice.actions
export const followReducer = followSlice.reducer

const RootReducer = combineReducers({
  auth: authReducer,
  follow: followReducer
})

export default RootReducer