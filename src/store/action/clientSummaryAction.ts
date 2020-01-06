import { Dispatch } from "redux";
import { httpRequestHandler } from "../../utils/api/httpRequestHandler";
import { ClientSummaryState } from "../reducers/IClientSummaryState";
import {
  clientSummaryFailure,
  clientSummaryRequest,
  clientSummarySuccess
} from "./creator/clientSummaryCreator";

export const getClientSummaryAction = () => (
  dispatch: Dispatch
): Promise<any> => {
  dispatch(clientSummaryRequest());

  return httpRequestHandler.getRequest().then(
    (data: ClientSummaryState) => {
      return dispatch(clientSummarySuccess(data));
    },
    (error: Error) => {
      return dispatch(clientSummaryFailure(error));
    }
  );
};
