import {
  CLIENT_SUMMARY_FAILURE,
  CLIENT_SUMMARY_REQUEST,
  CLIENT_SUMMARY_SUCCESS,
  ClientSummaryActionTypes
} from "../action/constants/actionConstants";
import { ClientSummaryState } from "./IClientSummaryState";

export const clientSummaryState: ClientSummaryState = {
  id: 0,
  name: "",
  status: "",
  adminType: "",
  passwordExpiryPeriod: 0,
  activeFrom: ""
};

export const clientSummary = (
  state: ClientSummaryState = clientSummaryState,
  action: ClientSummaryActionTypes
): any => {
  switch (action.type) {
    case CLIENT_SUMMARY_REQUEST:
      return { ...state, ...action.data };
    case CLIENT_SUMMARY_SUCCESS:
      return { ...state, ...action.data };
    case CLIENT_SUMMARY_FAILURE:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
