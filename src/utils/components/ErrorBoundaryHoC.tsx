import ErrorBoundary from "./ErrorBoundary";
import React from "react";

export const withErrorBoundary = <T extends object>(
  Component: React.ComponentType<T>
): any => {
  return class ComponentWithErrorBoundary extends React.Component<T> {
    render() {
      return (
        <>
          <ErrorBoundary>
            <Component {...this.props} />
          </ErrorBoundary>
        </>
      );
    }
  };
};
