import {
  CLIENT_SUMMARY_FAILURE,
  CLIENT_SUMMARY_REQUEST,
  CLIENT_SUMMARY_SUCCESS
} from "../constants/actionConstants";

import {
  failureAction,
  requestAction,
  successAction
} from "./httpActionCreators";
import { IAsyncFailure, IAsyncRequest, IAsyncSuccess } from "./IAsync";

export const clientSummaryRequest = (): IAsyncRequest =>
  requestAction(CLIENT_SUMMARY_REQUEST);

export const clientSummarySuccess = (payload: any): IAsyncSuccess =>
  successAction(CLIENT_SUMMARY_SUCCESS, payload);

export const clientSummaryFailure = (error: Error): IAsyncFailure =>
  failureAction(CLIENT_SUMMARY_FAILURE, error);
