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
    <Provider store={store}>
        <ErrorBoundary>
          <Container
            data-testid="clientSummary"
            fluid={true}
            className="outerContainer"
          >
            <Container fluid={false} className="innerContainer">
              <Router>
                <Route
                  exact={true}
                  path="/clientSummary"
                  component={ClientSummary}
                />
              </Router>
            </Container>
          </Container>
        </ErrorBoundary>
    </Provider>
  </>
);
export default App;
