/* eslint-disable no-undef */
import getBirths from "../getBirths";

describe("getBirths", () => {
  test("should returns an empty array when there are no BIRT tag", () => {
    const individual = {
      tree: []
    };

    const places = [];

    expect(getBirths({ individual, places })).toEqual(
      expect.arrayContaining([])
    );
  });

  test("should returns an array with date and place", () => {
    const individual = {
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

    const places = [
      { id: "P1", name: "Godric's Hollow, England, Great Britain" }
    ];

    const expected = [
      {
        date: "1980-07-31",
        place: {
          id: "P1",
          name: "Godric's Hollow, England, Great Britain"
        }
      }
    ];

    expect(getBirths({ individual, places })).toEqual(
      expect.arrayContaining(expected)
    );
  });

  test("shouldn't have place", () => {
    const individual = {
      tree: [
        {
          tag: "BIRT",
          tree: [{ tag: "DATE", data: "1980-07-31" }]
        }
      ]
    };

    const places = [];

    const expected = [
      {
        date: "1980-07-31"
      }
    ];

    expect(getBirths({ individual, places })).toEqual(
      expect.arrayContaining(expected)
    );
  });

  test("shouldn't have date", () => {
    const individual = {
      tree: [
        {
          tag: "BIRT",
          tree: [
            { tag: "PLAC", data: "Godric's Hollow, England, Great Britain" }
          ]
        }
      ]
    };

    const places = [
      { id: "P1", name: "Godric's Hollow, England, Great Britain" }
    ];

    const expected = [
      {
        place: {
          id: "P1",
          name: "Godric's Hollow, England, Great Britain"
        }
      }
    ];

    expect(getBirths({ individual, places })).toEqual(
      expect.arrayContaining(expected)
    );
  });

  test("shouldn't have place id when places is not provided", () => {
    const individual = {
      tree: [
        {
          tag: "BIRT",
          tree: [
            { tag: "PLAC", data: "Godric's Hollow, England, Great Britain" }
          ]
        }
      ]
    };

    const expected = [
      {
        place: {
          name: "Godric's Hollow, England, Great Britain"
        }
      }
    ];

    expect(getBirths({ individual })).toEqual(expect.arrayContaining(expected));
  });
});
