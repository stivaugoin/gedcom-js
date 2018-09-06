/* eslint-disable no-undef */
import getBirths from "../getBirths";

describe("getBirths", () => {
  test("should returns an empty array when there are no BIRT tag", () => {
    const node = {
      tree: []
    };

    expect(getBirths(node)).toEqual(expect.arrayContaining([]));
  });

  test("should returns an array with date and place", () => {
    const node = {
      tree: [
        {
          tag: "BIRT",
          tree: [
            { tag: "DATE", data: "1980-07-31" },
            { tag: "PLAC", data: "Godric's Hollow, England, Great Britain" }
          ]
        }
      ]
    };

    const expected = [
      {
        date: "1980-07-31",
        place: {
          name: "Godric's Hollow, England, Great Britain"
        }
      }
    ];

    expect(getBirths(node)).toEqual(expect.arrayContaining(expected));
  });
});
