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
import { AsyncFailure, AsyncRequest, AsyncSuccess } from "./IAsync";

export const clientSummaryRequest = (): AsyncRequest =>
  requestAction(CLIENT_SUMMARY_REQUEST);

export const clientSummarySuccess = (payload: any): AsyncSuccess =>
  successAction(CLIENT_SUMMARY_SUCCESS, payload);

export const clientSummaryFailure = (error: Error): AsyncFailure =>
  failureAction(CLIENT_SUMMARY_FAILURE, error);
