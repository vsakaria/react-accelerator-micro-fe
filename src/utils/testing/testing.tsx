import { compose } from "../compose";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

export const shallowSnapShot = compose(
  toJson,
  shallow
);

export const mountSnapShot = compose(
  toJson,
  mount
);
