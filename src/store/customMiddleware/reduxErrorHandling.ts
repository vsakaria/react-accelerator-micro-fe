import { Dispatch } from "redux";
import { CwaError, StatusCode } from "./ICwaError";
import { httpRequestHandler } from "../../utils/api/httpRequestHandler";
import { ERROR_LOGGING } from "../../utils/api/urlConstants";

export const reduxErrorHandlingMiddleware = (store: any) => (
  next: Dispatch
) => (action: any): Dispatch => {
  try {
    return next(action);
  } catch (err) {
    const data: CwaError = {
      loggingLevel: "error",
      cwaStatusCode: StatusCode.ReduxError,
      stackTrack: err,
      cause: action.type,
      applicationState: store.getState(),
      message: "A Redux error occur while dispatching an action"
    };

    httpRequestHandler.postRequest(ERROR_LOGGING, data);
    console.error("A Redux error occur while dispatching an action", data);
    throw err;
  }
};

export const reduxApiErrorHandlingMiddleware = (store: any) => (
  next: Dispatch
) => (action: any): Dispatch => {
  if (action.type.includes("FAILURE")) {
    const data: CwaError = {
      loggingLevel: "error",
      cwaStatusCode: StatusCode.ReduxApiError,
      httpStatusCode: action.data.status,
      cause: action.type,
      applicationState: store.getState(),
      message:
        "A error occur while calling an external resource via Redux thunk"
    };

    httpRequestHandler.postRequest(ERROR_LOGGING, data);
    console.error(
      "A error occur while calling an external resource via Redux thunk",
      data
    );
    return next(action);
  } else {
    return next(action);
  }
};
