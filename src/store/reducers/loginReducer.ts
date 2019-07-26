import { ILoginState, ILoginActionTypes } from "../action/creator/loginCreator";
import { Reducer } from "react";
import { UPDATE_LOGIN, RESET_LOGIN } from "../action/constants/actionConstants";

export const loginInitState: ILoginState = {
  status: false
};

export const login: Reducer<ILoginState, ILoginActionTypes> = (
  state: ILoginState = loginInitState,
  action: ILoginActionTypes
): ILoginState => {
  switch (action.type) {
    case UPDATE_LOGIN:
      return { ...state, ...action.data };
    case RESET_LOGIN:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
