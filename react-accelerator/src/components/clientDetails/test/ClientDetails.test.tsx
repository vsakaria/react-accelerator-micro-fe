import React from "react";
import { ClientDetails } from "../ClientDetails";
import { shallowSnapShot } from "../../../utils/testing/testing";
import { shallow } from "enzyme";

describe("ClientSummary", () => {
  let props = {
    id: 49084369,
    name: "AutoCBS1",
    status: "Active",
    adminType: "Single Admin",
    passwordExpiryPeriod: 90,
    activeFrom: "24/05/2019"
  };

  it("should display the title", () => {
    const clientSummarySS = shallowSnapShot(<ClientDetails {...props} />);
    expect(clientSummarySS).toMatchSnapshot();
  });

  it("should display the title", () => {
    props.passwordExpiryPeriod = 1;

    const clientSummarySS = shallow(<ClientDetails {...props} />);
    const dayNodeText = clientSummarySS
      .find("td")
      .at(9)
      .text();

    expect(dayNodeText).toEqual("1 day");
  });
});
