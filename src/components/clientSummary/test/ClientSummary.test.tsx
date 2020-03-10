import React from "react";
import {
  renderWithReduxThunk
} from "../../../utils/testing/testingUtlis";
import { cleanup, waitForElement } from "@testing-library/react";

import ClientSummary from "../ClientSummary";

afterAll(cleanup);

test("ClientSummary displays client id after HTTP call", async () => {
  const { getByTestId } = renderWithReduxThunk(<ClientSummary />);

  const idWrapper = await waitForElement(() => getByTestId("client-id"));
  const idValue = idWrapper.lastChild;
  expect(idValue).toHaveTextContent("46892093");
});

test("ClientSummary displays client name after HTTP call", async () => {
  const { getByTestId } = renderWithReduxThunk(<ClientSummary />);

  const nameWrapper = await waitForElement(() => getByTestId("client-name"));
  const nameValue = nameWrapper.lastChild;
  expect(nameValue).toHaveTextContent("AutoCBS1");
});
