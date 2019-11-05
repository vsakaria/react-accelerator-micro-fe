import { IAsyncFailure, IAsyncRequest, IAsyncSuccess } from "../creator/IAsync";

export const CLIENT_SUMMARY_REQUEST = "CLIENT_SUMMARY_REQUEST";
export const CLIENT_SUMMARY_SUCCESS = "CLIENT_SUMMARY_SUCCESS";
export const CLIENT_SUMMARY_FAILURE = "CLIENT_SUMMARY_FAILURE";

export interface IClientSummaryActionTypes {
  type:
    | typeof CLIENT_SUMMARY_SUCCESS
    | typeof CLIENT_SUMMARY_REQUEST
    | typeof CLIENT_SUMMARY_FAILURE;
  data: IAsyncRequest | IAsyncSuccess | IAsyncFailure;
}
