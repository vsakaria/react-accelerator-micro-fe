import React, { ReactElement } from "react";
import ErrorBoundary from "./ErrorBoundary";

export const withErrorBoundary = <T extends object>(
  Component: React.ComponentType<T>
): React.FC<T> => (props: any): ReactElement => {
  return (
    <>
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    </>
  );
};
