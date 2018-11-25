/* eslint-disable no-undef */
import getWeddings from "../getWeddings";

describe("getWeddings()", () => {
  const individual = {
    pointer: "@P1@",
    tag: "INDI",
    tree: [{ tag: "FAMS", data: "@F1@" }]
  };

  const individuals = [
    {
      pointer: "@P1@",
      tag: "INDI",
      tree: [{ tag: "NAME", data: "Lily /Evans/" }, { tag: "SEX", data: "F" }]
    },
    {
      pointer: "@P2@",
      tag: "INDI",
      tree: [{ tag: "NAME", data: "James /Potter/" }, { tag: "SEX", data: "M" }]
    }
  ];

  const families = [
    {
      pointer: "@F1@",
      tag: "FAM",
      tree: [
        { tag: "WIFE", data: "@P1@" },
        { tag: "HUSB", data: "@P2@" },
        {
          tag: "MARR",
          tree: [
            { tag: "DATE", data: "1979" },
            { tag: "PLAC", data: "Cokeworth, Midlands, England, Great Britain" }
          ]
        }
      ]
    }
  ];

  const places = [
    { id: "P1", name: "Cokeworth, Midlands, England, Great Britain" }
  ];

  test("should throw an error when individual is missing", () => {
    function callGetWeddings() {
      getWeddings({ individuals, families, places });
    }
    expect(callGetWeddings).toThrowError("individual is missing or empty");
  });

  test("should throw an error when individual is empty", () => {
    function callGetWeddings() {
      getWeddings({ individual: {}, individuals, families, places });
    }
    expect(callGetWeddings).toThrowError("individual is missing or empty");
  });

  test("should throw an error when individuals is missing", () => {
    function callGetWeddings() {
      getWeddings({ individual, families, places });
    }
    expect(callGetWeddings).toThrowError("individuals is missing or empty");
  });

  test("should throw an error when individuals is empty", () => {
    function callGetWeddings() {
      getWeddings({ individual, individuals: [], families, places });
    }
    expect(callGetWeddings).toThrowError("individuals is missing or empty");
  });

  test("should throw an error when families is missing", () => {
    function callGetWeddings() {
      getWeddings({ individual, individuals, places });
    }
    expect(callGetWeddings).toThrowError("families is missing or empty");
  });

  test("should throw an error when families is empty", () => {
    function callGetWeddings() {
      getWeddings({ individual, individuals, families: [], places });
    }
    expect(callGetWeddings).toThrowError("families is missing or empty");
  });

  test("should throw an error when places is missing", () => {
    function callGetWeddings() {
      getWeddings({ individual, individuals, families });
    }
    expect(callGetWeddings).toThrowError("places is missing or empty");
  });

  test("should throw an error when places is empty", () => {
    function callGetWeddings() {
      getWeddings({ individual, individuals, families, places: [] });
    }
    expect(callGetWeddings).toThrowError("places is missing or empty");
  });

  test("should returns an empty array when individual don't have FAMS tag", () => {
    const ind = { ...individual };
    ind.tree = [];
    expect(
      getWeddings({ individual: ind, individuals, families, places })
    ).toEqual(expect.arrayContaining([]));
  });

  test("should returns an empty array when family is not found", () => {
    const newFamilies = [{ pointer: "@F2@" }];

    expect(
      getWeddings({ individual, individuals, families: newFamilies, places })
    ).toEqual(expect.arrayContaining([]));
  });

  test("should returns an array of weddings", () => {
    const weddings = getWeddings({ individual, individuals, families, places });

    const expected = [
      {
        date: "1979",
        place: {
          id: "P1",
          name: "Cokeworth, Midlands, England, Great Britain"
        },
        spouse: {
          id: "I2",
          fname: "James",
          lname: "Potter"
        }
      }
    ];

    expect(weddings).toEqual(expect.arrayContaining(expected));
  });
});
