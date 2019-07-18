import ErrorBoundary from "./ErrorBoundary";
import React from "react";

export const withErrorBoundary = <T extends object>(
  Component: React.ComponentType<T>
): React.FC<T> => props => {
  return (
    <>
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    </>
  );
};
