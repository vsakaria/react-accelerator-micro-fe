import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { renderApp } from "../src/utils/microfrontend/singleSpaHelper";

if (process.env.NODE_ENV === "development") {
  ReactDOM.render(<App />, document.getElementById("root"));
} else {
  renderApp("React", "react-app");
}
