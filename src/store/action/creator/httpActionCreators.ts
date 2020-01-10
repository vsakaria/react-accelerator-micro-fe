import { AsyncFailure, AsyncRequest, AsyncSuccess } from "./IAsync";

export const requestAction = (type: string): AsyncRequest => {
  return { type, data: { loading: true } };
};

export const successAction = (type: string, payload: any): AsyncSuccess => {
  return {
    type,
    data: Object.assign(payload, { loading: false })
  };
};

export const failureAction = (type: string, error: any): AsyncFailure => {
  return {
    type,
    data: Object.assign({}, error, { loading: false })
  };
};
