import React from "react";
import { shallow } from "enzyme";
import WebcamCapture from "./WebcamCapture";

describe("WebcamCapture", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<WebcamCapture />);
    expect(wrapper).toMatchSnapshot();
  });
});
