import { shallow } from "enzyme";
import React from "react";
import { shallowSnapShot } from "../../../utils/testing/testingComposers";
import { ClientDetails } from "../ClientDetails";
import { render } from "../../../utils/testing/testingUtlis";

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
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders 90 days text", () => {
    props.passwordExpiryPeriod = 90;

    const { getByText } = render(<ClientDetails {...props} />);
    expect(getByText(/90 days/i)).toBeInTheDocument();
  });

  it("inserts text in h1", () => {
    const { getByText } = render(<ClientDetails {...props} />);
    expect(getByText("Client details")).toHaveClass("primary-color");
  });
});
