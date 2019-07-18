import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log(error, info);
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
