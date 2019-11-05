import { IAsyncFailure, IAsyncRequest, IAsyncSuccess } from "./IAsync";

export const requestAction = (type: string): IAsyncRequest => {
  return { type, data: { loading: true } };
};

export const successAction = (type: string, payload: any): IAsyncSuccess => {
  return {
    type,
    data: Object.assign(payload, { loading: false })
  };
};

export const failureAction = (type: string, error: Error): IAsyncFailure => {
  return {
    type,
    data: {
      error: true,
      message: error.message,
      loading: false
    }
  };
};
