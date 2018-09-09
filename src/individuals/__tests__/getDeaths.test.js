/* eslint-disable no-undef */
import getDeaths from "../getDeaths";

describe("getDeaths", () => {
  test("should returns an empty array when there are no DEAT tag", () => {
    const individual = {
      tree: []
    };

    const places = [];

    expect(getDeaths({ individual, places })).toEqual(
      expect.arrayContaining([])
    );
  });

  test("should returns an array with date and place", () => {
    const individual = {
      tree: [
        {
          tag: "DEAT",
          tree: [
            { tag: "DATE", data: "1981-10-31" },
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
        date: "1981-10-31",
        place: {
          id: "P1",
          name: "Godric's Hollow, England, Great Britain"
        }
      }
    ];

    expect(getDeaths({ individual, places })).toEqual(
      expect.arrayContaining(expected)
    );
  });

  test("shouldn't have place", () => {
    const individual = {
      tree: [
        {
          tag: "DEAT",
          tree: [{ tag: "DATE", data: "1981-10-31" }]
        }
      ]
    };

    const places = [];

    const expected = [
      {
        date: "1981-10-31"
      }
    ];

    expect(getDeaths({ individual, places })).toEqual(
      expect.arrayContaining(expected)
    );
  });

  test("shouldn't have date", () => {
    const individual = {
      tree: [
        {
          tag: "DEAT",
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

    expect(getDeaths({ individual, places })).toEqual(
      expect.arrayContaining(expected)
    );
  });

  test("shouldn't have place id when places is not provided", () => {
    const individual = {
      tree: [
        {
          tag: "DEAT",
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

    expect(getDeaths({ individual })).toEqual(expect.arrayContaining(expected));
  });
});
