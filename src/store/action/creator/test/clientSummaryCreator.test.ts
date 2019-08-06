import {
  clientSummaryRequest,
  clientSummarySuccess,
  clientSummaryFailure
} from "../clientSummaryCreator";

describe("ClientSummary Action Creator", () => {
  it("should creator a request action", () => {
    const clientSummaryRequestAction = clientSummaryRequest();
    expect(clientSummaryRequestAction).toMatchSnapshot();
  });

  it("should creator a success action", () => {
    const payload = {
      data: "some_data"
    };
    const clientSummaryRequestAction = clientSummarySuccess(payload);
    expect(clientSummaryRequestAction).toMatchSnapshot();
  });

  it("should creator a failure action", () => {
    const error = new Error("SOME ERROR MESSAGE");
    const clientSummaryRequestAction = clientSummaryFailure(error);
    expect(clientSummaryRequestAction).toMatchSnapshot();
  });
});
