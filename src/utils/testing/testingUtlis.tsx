import { render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";

//@ts-ignore
import { BrandProvider, LLOYDS } from "@lbg/constellation";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../../store/reducers";
import thunk from "redux-thunk";

const BrandProviderTestWrapper = ({ children }: any): any => {
  return <BrandProvider brand={LLOYDS}>{children}</BrandProvider>;
};

const customRender = (ui: any, options = {}): any =>
  render(ui, { wrapper: BrandProviderTestWrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

// Integration helper functions.
export function renderWithReduxThunk(ui: any): any {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return {
    ...customRender(<Provider store={store}>{ui}</Provider>),
    store
  };
}

export function renderWithRedux(ui: ReactElement): any {
  const store = createStore(rootReducer);

  return {
    ...customRender(<Provider store={store}>{ui}</Provider>),
    store
  };
}
