export interface AsyncFailure {
  type: string;
  data: {
    error: boolean;
    message: string;
    loading: boolean;
  };
}

export interface AsyncSuccess<T = any> {
  type: string;
  data: {
    payload: T;
    loading: boolean;
  };
}

export interface AsyncRequest {
  type: string;
  data: {
    loading: boolean;
  };
}
