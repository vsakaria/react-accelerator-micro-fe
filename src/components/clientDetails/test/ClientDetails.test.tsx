import React from "react";
import { ClientDetails } from "../ClientDetails";
import { render, cleanup } from "../../../utils/testing/testingUtlis";

afterEach(cleanup);

describe("ClientSummary", () => {
  const props = {
    id: 49084369,
    name: "AutoCBS1",
    status: "Active",
    adminType: "Single Admin",
    passwordExpiryPeriod: 1,
    activeFrom: "24/05/2019"
  };

  it("match the snapshot", () => {
    const { asFragment } = render(<ClientDetails {...props} />);
    expect(asFragment()).toMatchSnapshot("Normal props with password expiry 1");
  });

  it("renders 90 days text", () => {
    props.passwordExpiryPeriod = 90;
    const { asFragment } = render(<ClientDetails {...props} />);
    expect(asFragment()).toMatchSnapshot(
      "Normal props with password expiry 90"
    );
  });

  it("inserts text in h1", () => {
    const { getByText } = render(<ClientDetails {...props} />);
    expect(getByText("Client details")).toHaveClass("primary-color");
  });
});
