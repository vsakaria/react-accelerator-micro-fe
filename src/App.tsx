import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import "./assets/global/css/Global.module.css";
import configureStore from "./store/applicationStore";
import ClientSummary from "./components/clientSummary/ClientSummary";
import ErrorBoundary from "./utils/components/ErrorBoundary";
const store = configureStore();
const App: React.FC = () => (
  <>
    <ErrorBoundary>
      <Container fluid={true} className="outerContainer">
        <Container fluid={false} className="innerContainer">
          <Provider store={store}>
            <Router basename="/clientSummary">
              <Route exact={true} path="/" component={ClientSummary} />
            </Router>
          </Provider>
        </Container>
      </Container>
    </ErrorBoundary>
  </>
);
export default App;
