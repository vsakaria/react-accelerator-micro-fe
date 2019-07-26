import { combineReducers, Reducer } from "redux";
import { login } from "./loginReducer";

export const rootReducer: Reducer<any> = combineReducers<{}>({
  login
});
