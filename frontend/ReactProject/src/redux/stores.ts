import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import {combineReducers} from "redux";
import {authReducer} from  './feature/auth/authSlice'
import { projectReducer } from "./feature/project/projectSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  project:projectReducer

})
export const store = configureStore({
  reducer: rootReducer,

});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
export default store