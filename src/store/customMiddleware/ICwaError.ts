export enum StatusCode {
  ReduxError = 4900,
  ReduxApiError = 4910,
  ReactComponentError = 4920
}

export type LogLevel = "info" | "debug" | "error";

export interface CwaError {
  loggingLevel: LogLevel;
  cwaStatusCode: StatusCode;
  httpStatusCode?: number;
  cause?: string;
  stackTrack?: any;
  applicationState: {};
  message: string;
}
