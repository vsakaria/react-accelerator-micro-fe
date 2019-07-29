import { Dispatch } from "redux";
import {
  clientSummaryRequest,
  clientSummarySuccess,
  clientSummaryFailure
} from "./creator/clientSummaryCreator";
import { httpRequestHandler } from "../../utils/api/httpRequestHandler";
import { IClientSummaryState } from "../reducers/IClientSummaryState";

export const getClientSummaryAction = () => (dispatch: Dispatch) => {
  clientSummaryRequestAction()(dispatch);

  return httpRequestHandler.getRequest(`clientSummary`).then(
    (data: IClientSummaryState) => {
      return clientSummarySuccessAction(data)(dispatch);
    },
    (error: Error) => {
      return clientSummaryFailureAction(error)(dispatch);
    }
  );
};

const clientSummaryRequestAction = () => (dispatch: Dispatch): void => {
  dispatch(clientSummaryRequest());
};

const clientSummarySuccessAction = (payload: IClientSummaryState) => (
  dispatch: Dispatch
): void => {
  dispatch(clientSummarySuccess(payload));
};

const clientSummaryFailureAction = (error: Error) => (
  dispatch: Dispatch
): void => {
  dispatch(clientSummaryFailure(error));
};

export {
  clientSummaryRequestAction,
  clientSummarySuccessAction,
  clientSummaryFailureAction
};
