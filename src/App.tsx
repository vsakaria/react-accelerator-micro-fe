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

interface App {
  appName: string;
}

const App: React.FC<App> = (props: App) => (
  <>
    <Container fluid={true} className="outerContainer">
      <Container fluid={false} className="innerContainer">
        <Provider store={store}>
          <ErrorBoundary>
            <BrandProviderLoader>
              <Router basename={`/${props.appName.toLocaleLowerCase()}`}>
                <Route
                  exact={true}
                  path="/clientSummary"
                  component={ClientSummary}
                />
              </Router>
            </BrandProviderLoader>
          </ErrorBoundary>
        </Provider>
      </Container>
    </Container>
  </>
);
export default App;
