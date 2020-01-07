import React from "react";
import { StatusCode, ICwaError, } from "../../store/customMiddleware/ICwaError";
import { connect } from "react-redux";
import { IAppState } from "../../store/reducers";
import { httpRequestHandler } from "../api/httpRequestHandler";
import { ERROR_LOGGING } from "../api/urlConstants";

class ErrorBoundary extends React.Component<any> {
  state = { hasError: false };

  componentDidCatch(err: any, info: any) {
    this.setState({ hasError: true });

    const data: ICwaError = {
      loggingLevel: 'error',
      cwaStatusCode: StatusCode.ReactComponentError,
      stackTrack: info.componentStack,
      applicationState: this.props.state,
      message: 'There was an error in a component'
    }
    httpRequestHandler.postRequest(ERROR_LOGGING, data)
    console.error("An error occured in a React component", data);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

interface IErrorBoundaryProps {
  state: {};
}

const mapStateToProps = (store: IAppState): IErrorBoundaryProps => ({
  state: store
});

export default connect(mapStateToProps, null)(ErrorBoundary);
