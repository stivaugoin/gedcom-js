/* eslint-disable no-undef */
import getParents from "../getParents";

describe("getParents()", () => {
  const individual = {
    pointer: "@P1@",
    tag: "INDI",
    tree: [{ tag: "FAMC", data: "@F1@" }]
  };

  const individuals = [
    {
      pointer: "@P2@",
      tag: "INDI",
      tree: [{ tag: "NAME", data: "James /Potter/" }]
    },
    {
      pointer: "@P3@",
      tag: "INDI",
      tree: [{ tag: "NAME", data: "Lily /Evans/" }]
    }
  ];

  const families = [
    {
      pointer: "@F1@",
      tag: "FAM",
      tree: [
        { tag: "CHIL", data: "@P1@" },
        { tag: "HUSB", data: "@P2@" },
        { tag: "WIFE", data: "@P3@" }
      ]
    }
  ];

  test("should throw an error when individual is missing", () => {
    function callGetParents() {
      getParents({ individuals, families });
    }
    expect(callGetParents).toThrowError("individual is missing or empty");
  });

  test("should throw an error when individual is empty", () => {
    function callGetParents() {
      getParents({ individual: {}, individuals, families });
    }
    expect(callGetParents).toThrowError("individual is missing or empty");
  });

  test("should throw an error when individuals is missing", () => {
    function callGetParents() {
      getParents({ individual, families });
    }
    expect(callGetParents).toThrowError("individuals is missing or empty");
  });

  test("should throw an error when individuals is empty", () => {
    function callGetParents() {
      getParents({ individual, individuals: [], families });
    }
    expect(callGetParents).toThrowError("individuals is missing or empty");
  });

  test("should throw an error when families is missing", () => {
    function callGetParents() {
      getParents({ individual, individuals });
    }
    expect(callGetParents).toThrowError("families is missing or empty");
  });

  test("should throw an error when families is empty", () => {
    function callGetParents() {
      getParents({ individual, individuals, families: [] });
    }
    expect(callGetParents).toThrowError("families is missing or empty");
  });

  test("should returns an empty array when individual don't have FAMC tag", () => {
    const ind = { ...individual };
    ind.tree = [];
    expect(getParents({ individual: ind, individuals, families })).toEqual(
      expect.arrayContaining([])
    );
  });

  test("should returns an empty array when family is not found", () => {
    const newFamilies = [{ pointer: "@F2@" }];

    expect(
      getParents({ individual, individuals, families: newFamilies })
    ).toEqual(expect.arrayContaining([]));
  });

  test("should returns an array with an empty object when parents isn't found", () => {
    const newIndividuals = [{ pointer: "@P1@" }];

    expect(
      getParents({ individual, individuals: newIndividuals, families })
    ).toEqual(expect.arrayContaining([{}]));
  });

  test("should returns an array of parents", () => {
    const parents = getParents({ individual, individuals, families });

    const expected = [
      {
        id: "I2",
        fname: "James",
        lname: "Potter",
        relation: "father"
      },
      {
        id: "I3",
        fname: "Lily",
        lname: "Evans",
        relation: "mother"
      }
    ];

    expect(parents).toEqual(expect.arrayContaining(expected));
  });
});
