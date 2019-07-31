import {
  CLIENT_SUMMARY_REQUEST,
  CLIENT_SUMMARY_SUCCESS,
  CLIENT_SUMMARY_FAILURE
} from "../constants/actionConstants";

import { IAsyncFailure, IAsyncSuccess, IAsyncRequest } from "./IAsync";
import {
  requestAction,
  successAction,
  failureAction
} from "./httpActionCreators";

export const clientSummaryRequest = (): IAsyncRequest =>
  requestAction(CLIENT_SUMMARY_REQUEST);

export const clientSummarySuccess = (payload: any): IAsyncSuccess =>
  successAction(CLIENT_SUMMARY_SUCCESS, payload);

export const clientSummaryFailure = (error: Error): IAsyncFailure =>
  failureAction(CLIENT_SUMMARY_FAILURE, error);
