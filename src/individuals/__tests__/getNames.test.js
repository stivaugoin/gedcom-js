/* eslint-disable no-undef */
import getNames from "../getNames";

describe("getNames", () => {
  const node = {
    tree: [
      {
        tag: "NAME",
        data: "Harry /Potter/"
      }
    ]
  };

  test("should returns names (array of fname and lname)", () => {
    expect(getNames(node)).toEqual(
      expect.arrayContaining([{ fname: "Harry", lname: "Potter" }])
    );
  });
});
