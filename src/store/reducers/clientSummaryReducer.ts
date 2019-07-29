import {
  CLIENT_SUMMARY_REQUEST,
  CLIENT_SUMMARY_SUCCESS,
  CLIENT_SUMMARY_FAILURE,
  IClientSummaryActionTypes
} from "../action/constants/actionConstants";
import { IClientSummaryState } from "./IClientSummaryState";

export const clientSummaryState: IClientSummaryState = {
  id: 0,
  name: "",
  status: "",
  adminType: "",
  passwordExpiryPeriod: 0,
  activeFrom: ""
};

export const clientSummary = (
  state: IClientSummaryState = clientSummaryState,
  action: IClientSummaryActionTypes
): any => {
  switch (action.type) {
    case CLIENT_SUMMARY_REQUEST:
      return { ...state, ...action.data };
    case CLIENT_SUMMARY_SUCCESS:
      return { ...state, ...action.data };
    case CLIENT_SUMMARY_FAILURE:
      return { ...state, ...action.data };
    case CLIENT_SUMMARY_FAILURE:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
