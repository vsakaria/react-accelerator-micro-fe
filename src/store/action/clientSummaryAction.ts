import { Dispatch } from "redux";
import { httpRequestHandler } from "../../utils/api/httpRequestHandler";
import { IClientSummaryState } from "../reducers/IClientSummaryState";
import {
  clientSummaryFailure,
  clientSummaryRequest,
  clientSummarySuccess
} from "./creator/clientSummaryCreator";

export const getClientSummaryAction = () => (dispatch: Dispatch) => {
  dispatch(clientSummaryRequest());

  return httpRequestHandler.getRequest("/clientSummary").then(
    (data: IClientSummaryState) => {
      return dispatch(clientSummarySuccess(data));
    },
    (error: Error) => {
      return dispatch(clientSummaryFailure(error));
    }
  );
};
