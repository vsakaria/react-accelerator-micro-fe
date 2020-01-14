import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { compose } from "../compose";

export const shallowSnapShot = compose(
  toJson,
  shallow
);

export const mountSnapShot = compose(
  toJson,
  mount
);
