/* eslint-disable no-undef */
import findTag from "../findTags";

describe("findTag", () => {
  test("should returns data key when it not empty", () => {
    const seed = [
      {
        tag: "NAME",
        data: "Harry /Potter/",
        tree: []
      }
    ];

    const expected = [{ data: "Harry /Potter/" }];

    expect(findTag(seed, "NAME")).toEqual(expect.arrayContaining(expected));
  });

  test("should returns tree key when data is empty", () => {
    const seed = [
      {
        tag: "BIRT",
        data: "",
        tree: [
          {
            pointer: "",
            tag: "DATE",
            data: "1960-01-30",
            tree: []
          }
        ]
      }
    ];

    const expected = [
      {
        tree: [
          {
            pointer: "",
            tag: "DATE",
            data: "1960-01-30",
            tree: []
          }
        ]
      }
    ];

    expect(findTag(seed, "BIRT")).toEqual(expect.arrayContaining(expected));
  });
});
