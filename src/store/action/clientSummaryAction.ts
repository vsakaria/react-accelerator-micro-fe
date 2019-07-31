import { Dispatch } from "redux";
import {
  clientSummaryRequest,
  clientSummarySuccess,
  clientSummaryFailure
} from "./creator/clientSummaryCreator";
import { httpRequestHandler } from "../../utils/api/httpRequestHandler";
import { IClientSummaryState } from "../reducers/IClientSummaryState";

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
