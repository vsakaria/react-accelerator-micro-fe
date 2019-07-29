import { combineReducers, Reducer } from "redux";
import { clientSummary } from "./clientSummaryReducer";

export const rootReducer: Reducer<any> = combineReducers<{}>({
  clientSummary
});

export type IAppState = ReturnType<typeof rootReducer>;
