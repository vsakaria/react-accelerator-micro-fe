import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "reactstrap";
import "./assets/global/css/Global.module.css";
import ClientSummary from "./components/clientSummary/ClientSummary";
import ErrorBoundary from "./utils/components/ErrorBoundary";

const App: React.FC = () => (
  <>
    <ErrorBoundary>
      <Container fluid={true} className="outerContainer">
        <Container fluid={false} className="innerContainer">
          <Router>
            <Route exact={true} path="/" component={ClientSummary} />
          </Router>
        </Container>
      </Container>
    </ErrorBoundary>
  </>
);
export default App;
