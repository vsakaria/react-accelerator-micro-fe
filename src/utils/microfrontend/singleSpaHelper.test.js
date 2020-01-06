import { renderApp } from "./singleSpaHelper.js";
const mockObject = { bootstrap: [null], mount: [null], unmount: [null] };
it("returns the render object", () => {
  renderApp("React", "reactApp");
  const renderObject = window.renderReactApp();
  expect(JSON.stringify(renderObject)).toBe(JSON.stringify(mockObject));
});
