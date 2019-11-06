import React, { ReactNode } from "react";

class ErrorBoundary extends React.Component {
  public state = { hasError: false };

  public componentDidCatch(error: any, info: any): void {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
