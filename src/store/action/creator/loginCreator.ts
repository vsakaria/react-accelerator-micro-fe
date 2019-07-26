import { UPDATE_LOGIN, RESET_LOGIN } from "../constants/constants";

export interface ILoginState {
  status: boolean;
}

export interface IUpdateLoginAction {
  type: typeof UPDATE_LOGIN;
  data: ILoginState;
}

export const updateLoginCreator = (status: boolean): IUpdateLoginAction => ({
  type: UPDATE_LOGIN,
  data: {
    status
  }
});

export interface IResetLoginAction {
  type: typeof RESET_LOGIN;
  data: {
    status: false;
  };
}

export const resetLoginCreator = (): IResetLoginAction => ({
  type: RESET_LOGIN,
  data: {
    status: false
  }
});

export type ILoginActionTypes = IUpdateLoginAction | IResetLoginAction;
