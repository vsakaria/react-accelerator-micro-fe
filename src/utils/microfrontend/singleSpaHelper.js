import singleSpaReact from "single-spa-react";
import React from "react";
import ReactDOM from "react-dom";
import rootComponent from "../../App";
export const renderApp = (name, id) => {
  window[`render${name}App`] = () => {
    const reactLifecycles = singleSpaReact({
      React,
      ReactDOM,
      rootComponent,
      domElementGetter: () => document.getElementById(id)
    });

    const bootstrap = [reactLifecycles.bootstrap];

    const mount = [reactLifecycles.mount];

    const unmount = [reactLifecycles.unmount];
    return { bootstrap, mount, unmount };
  };
};
