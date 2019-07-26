import { updateLoginCreator, resetLoginCreator } from "./creator/loginCreator";
import { Dispatch } from "redux";

const updateLogin = (status: boolean) => (dispatch: Dispatch) => {
  dispatch(updateLoginCreator(status));
};

const resetLogin = () => (dispatch: Dispatch) => {
  dispatch(resetLoginCreator());
};

export { updateLogin, resetLogin };
