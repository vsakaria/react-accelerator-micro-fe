import React from "react";
import { shallow } from "enzyme";
import ClientSummary from "../ClientSummary";

describe("ClientSummary", () => {
  it("should display the title", () => {
    const clientSummary = shallow(<ClientSummary />);
    const title = clientSummary.find(".title").text();
    expect(title).toEqual("Client Summary");
  });
});
