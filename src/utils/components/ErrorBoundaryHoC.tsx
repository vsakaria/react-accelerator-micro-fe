import React from "react";
import ErrorBoundary from "./ErrorBoundary";

export const withErrorBoundary = <T extends object>(
  Component: React.ComponentType<T>
): React.FC<T> => (props) => {
  return (
    <>
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    </>
  );
};
