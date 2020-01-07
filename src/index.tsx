import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import configureStore from "./store/applicationStore";
import { BrandProviderLoader } from "./utils/components/BrandProviderLoader";
import { renderApp } from "../src/utils/microfrontend/singleSpaHelper";

const store = configureStore();

if (process.env.NODE_ENV === "development") {
  ReactDOM.render(<App />, document.getElementById("root"));
} else {
  renderApp("React", "react-app");
}

