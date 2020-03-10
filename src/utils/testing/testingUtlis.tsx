
import React, { ReactElement } from "react";
import { Provider } from "react-redux";

//@ts-ignore
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../../store/reducers";
import thunk from "redux-thunk";
import { render } from "@testing-library/react";

// re-export everything
export * from "@testing-library/react";

// Integration helper functions.
export function renderWithReduxThunk(component: ReactElement): {} {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
}

export function renderWithRedux(component: ReactElement): {} {
  const store = createStore(rootReducer);

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
}
