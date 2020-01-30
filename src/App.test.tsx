import React from "react";
import { render } from "./utils/testing/testingUtlis";
import App from "./App";

it("renders welcome message", () => {
  const { getByTestId } = render(<App appName="SOME_APP" />);
  expect(getByTestId(/clientSummary/i)).toBeInTheDocument();
});
