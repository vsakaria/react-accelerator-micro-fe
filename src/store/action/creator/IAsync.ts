export interface IAsyncFailure {
  type: string;
  data: {
    error: boolean;
    message: string;
    loading: boolean;
  };
}

export interface IAsyncSuccess<T = any> {
  type: string;
  data: {
    payload: T;
    loading: boolean;
  };
}

export interface IAsyncRequest {
  type: string;
  data: {
    loading: boolean;
  };
}
