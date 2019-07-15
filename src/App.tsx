import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "reactstrap";
import ClientSummary from "./components/client-summary/ClientSummary";

const App: React.FC = () => (
  <>
    <Container fluid={true} className="outerContainer">
      <Container fluid={false} className="innerContainer">
        <div className="marginTop30" />
        <Router>
          <Route exact={true} path="/" component={ClientSummary} />
        </Router>
      </Container>
    </Container>
  </>
);
export default App;
