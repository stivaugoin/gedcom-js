/* eslint-disable no-undef */
import getGender from "../getGender";

describe("getGender", () => {
  test("should returns sex when exists", () => {
    const node = {
      tree: [{ tag: "SEX", data: "M" }]
    };

    expect(getGender(node)).toBe("M");
  });

  test("should returns null when not exists", () => {
    const node = {
      tree: []
    };

    expect(getGender(node)).toBe(null);
  });
});
