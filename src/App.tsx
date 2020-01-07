import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import "./assets/global/css/Global.module.css";
import configureStore from "./store/applicationStore";
import ClientSummary from "./components/clientSummary/ClientSummary";
import ErrorBoundary from "./utils/components/ErrorBoundary";
import { BrandProviderLoader } from "./utils/components/BrandProviderLoader";
const store = configureStore();

const App: React.FC = () => (
  <>
    <Provider store={store}>
      <BrandProviderLoader>
        <ErrorBoundary>
          <Container fluid={true} className="outerContainer">
            <Container fluid={false} className="innerContainer">
              <Router basename="/clientSummary">
                <Route exact={true} path="/" component={ClientSummary} />
              </Router>
            </Container>
          </Container>
        </ErrorBoundary>
      </BrandProviderLoader>
    </Provider>
  </>
);
export default App;
