import { Dispatch } from "redux";

export const loggingMiddleware = (store: any) => (next: Dispatch) => (
  action: any
): Dispatch => {
  console.log("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  return result;
};
