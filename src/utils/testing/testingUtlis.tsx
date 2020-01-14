import { render } from "@testing-library/react";
import React from "react";

//@ts-ignore
import { BrandProvider, LLOYDS } from "@lbg/constellation";

const BrandProviderTestWrapper = ({ children }: any): any => {
  return <BrandProvider brand={LLOYDS}>{children}</BrandProvider>;
};

const customRender = (ui: any, options = {}) =>
  render(ui, { wrapper: BrandProviderTestWrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
