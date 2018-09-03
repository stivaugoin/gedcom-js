/* eslint-disable no-undef */
import getId from "../getId";

describe("getId", () => {
  test("should returns an Id", () => {
    const node = {
      pointer: "@P1@"
    };

    expect(getId(node)).toBe("P1");
  });

  test("should returns an Id with another letter", () => {
    const node = {
      pointer: "@P1@"
    };

    expect(getId(node, "I")).toBe("I1");
  });
});
